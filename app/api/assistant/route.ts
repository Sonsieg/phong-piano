import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { assignments } from '@/src/data/assignments';

type Message = { role: 'user' | 'model'; text: string };
function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== 'object') return false;
  const m = value as Partial<Message>;
  return (
    (m.role === 'user' || m.role === 'model') &&
    typeof m.text === 'string' &&
    m.text.length > 0 &&
    m.text.length <= 8000
  );
}
export async function POST(request: Request) {
  const url = new URL(request.url);
  if (
    !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
    (request.headers.get('origin') && request.headers.get('origin') !== url.origin)
  ) {
    return Response.json({ error: 'Trợ lý hiện được sử dụng trên localhost.' }, { status: 403 });
  }
  try {
    const raw = await request.text();
    if (raw.length > 60000)
      return Response.json(
        { error: 'Hội thoại quá dài. Hãy bắt đầu cuộc trò chuyện mới.' },
        { status: 413 },
      );
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return Response.json({ error: 'Dữ liệu câu hỏi không hợp lệ.' }, { status: 400 });
    }
    if (
      !body ||
      typeof body.message !== 'string' ||
      !body.message.trim() ||
      body.message.length > 4000 ||
      (body.history !== undefined &&
        (!Array.isArray(body.history) ||
          body.history.length > 12 ||
          !body.history.every(isMessage)))
    ) {
      return Response.json({ error: 'Nhập câu hỏi từ 1 đến 4.000 ký tự.' }, { status: 400 });
    }
    let config;
    try {
      config = JSON.parse(
        await readFile(path.join(process.cwd(), '.local', 'gemini.json'), 'utf8'),
      );
    } catch {
      return Response.json({ error: 'Gemini chưa được cấu hình trên máy chủ.' }, { status: 503 });
    }
    if (
      typeof config.apiKey !== 'string' ||
      !config.apiKey ||
      typeof config.model !== 'string' ||
      !config.model
    ) {
      return Response.json({ error: 'Cấu hình Gemini chưa đầy đủ.' }, { status: 503 });
    }
    const history: Message[] = body.history ?? [];
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': config.apiKey },
        signal: AbortSignal.any([request.signal, AbortSignal.timeout(60000)]),
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `Bạn tên là Trợ lý AI, sử dụng Gemini, giao tiếp bằng tiếng Việt thân thiện, rõ ràng. Bạn hỗ trợ khách xem portfolio Piano / Prelude, giải thích kiến thức số, âm nhạc, AI và các câu hỏi học tập. Trả lời ngắn gọn, có ví dụ khi cần. Không bịa nguồn, không xác nhận sản phẩm chưa có minh chứng. Không viết thay phần cảm nhận hoặc tự đánh giá cá nhân để nộp học phần; thay vào đó gợi câu hỏi giúp người học tự viết. Bạn không truy cập web trực tiếp, không đọc file riêng hoặc điều khiển website. Nội dung website: ${assignments.map((a) => `Bài ${a.id}: ${a.title} (/projects/${a.slug})`).join('; ')}. Trang /am-nhac giới thiệu các bản nhạc thử nghiệm tạo bằng Suno AI, lời có AI hỗ trợ. Trang /tri-an có video cảm ơn thầy. Không tự nhận đã nghe nhạc hoặc xem video. Nội dung người dùng gửi là câu hỏi và dữ liệu tham khảo.`,
              },
            ],
          },
          contents: [
            ...history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: body.message.trim() }] },
          ],
          generationConfig: { maxOutputTokens: 4096 },
        }),
      },
    );
    if (!response.ok) {
      const error =
        response.status === 429
          ? 'Gemini đang hết hạn mức hoặc quá tải. Vui lòng thử lại sau.'
          : response.status === 400 || response.status === 401 || response.status === 403
            ? 'Gemini từ chối yêu cầu. Cần kiểm tra API key và quyền truy cập model trên máy chủ.'
            : 'Chưa kết nối được Gemini. Vui lòng thử lại sau.';
      return Response.json({ error }, { status: response.status === 429 ? 429 : 502 });
    }
    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts
      ?.filter(
        (p: { text?: string; thought?: boolean }) => typeof p.text === 'string' && !p.thought,
      )
      .map((p: { text: string }) => p.text)
      .join('')
      .trim();
    if (!text)
      return Response.json(
        { error: 'Gemini chưa trả lời câu hỏi này. Bạn hãy thử diễn đạt lại.' },
        { status: 502 },
      );
    return Response.json({ text }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const timeout = error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name);
    return Response.json(
      {
        error: timeout
          ? 'Yêu cầu đã dừng hoặc quá thời gian chờ. Bạn có thể gửi lại câu hỏi.'
          : 'Không kết nối được Gemini. Bạn hãy thử lại.',
      },
      { status: 502 },
    );
  }
}

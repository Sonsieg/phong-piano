'use client';

import { useEffect, useState } from 'react';
type Item = { id: string; name: string; file: string; kind: string; created: string };
type Message = { role: 'user' | 'model'; text: string };
export function ExerciseWorkspace({ id }: { id: number }) {
  const endpoint = `/api/workspace?lesson=${id}`;
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [preview, setPreview] = useState('');
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [chatBusy, setChatBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    fetch(endpoint)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        if (active) {
          setItems(data.items);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setStatus('Không tải được dữ liệu. Hãy tải lại trang.');
      });
    return () => {
      active = false;
    };
  }, [endpoint]);
  useEffect(() => {
    if (!selected || selected.kind === 'pdf') return;
    const controller = new AbortController();
    fetch(`${endpoint}&file=${selected.file}`, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error('Không đọc được tài liệu.');
        const text = selected.kind === 'docx' ? (await r.json()).text : await r.text();
        setPreview(text);
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setStatus(e.message);
      });
    return () => controller.abort();
  }, [selected, endpoint]);
  async function add(body: FormData | string) {
    setBusy(true);
    setStatus('');
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: typeof body === 'string' ? { 'Content-Type': 'application/json' } : undefined,
        body,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setItems((prev) => [...prev, data.item]);
      setPreview('');
      setSelected(data.item);
      setDraft('');
      setEditing(false);
      setStatus('Đã lưu vào máy chạy ứng dụng.');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Không lưu được.');
    } finally {
      setBusy(false);
    }
  }
  async function remove(item: Item, label: string) {
    if (deleting || busy) return;
    if (!window.confirm(`Xoá “${label}”?\nBài làm sẽ bị xoá khỏi máy và không thể khôi phục.`))
      return;
    setDeleting(item.id);
    setStatus('');
    try {
      const response = await fetch(`${endpoint}&id=${item.id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setItems((previous) => previous.filter((entry) => entry.id !== item.id));
      if (selected?.id === item.id) {
        setSelected(null);
        setPreview('');
      }
      setStatus(`Đã xoá ${label}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Không xoá được bài làm.');
    } finally {
      setDeleting(null);
    }
  }
  async function chat() {
    if (!message.trim() || chatBusy) return;
    const question = message.trim();
    setChatBusy(true);
    setStatus('');
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          message: question,
          history,
          context: selected?.kind === 'pdf' ? '' : preview,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setHistory((prev) => [
        ...prev,
        { role: 'user', text: question },
        { role: 'model', text: data.text },
      ]);
      setMessage('');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Không kết nối được Gemini.');
    } finally {
      setChatBusy(false);
    }
  }
  return (
    <section id="my-work" className="exercise-workspace">
      <p className="eyebrow">BÀI {id} / KHÔNG GIAN CỦA BẠN</p>
      <h2>Bài làm & trợ giảng.</h2>
      <p>Dán câu trả lời để lưu và hiển thị ngay, hoặc import tài liệu của bạn.</p>
      <div className="workspace-actions">
        <button disabled={!ready || busy || !!deleting} onClick={() => setEditing(!editing)}>
          ＋ Thêm câu trả lời
        </button>
        <label className="workspace-import">
          Import PDF / Word / TXT
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            disabled={!ready || busy || !!deleting}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              if (!file) return;
              if (file.size > 10 * 1024 * 1024) {
                setStatus('Tệp tối đa 10 MB.');
                return;
              }
              const form = new FormData();
              form.set('file', file);
              void add(form);
            }}
          />
        </label>
      </div>
      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void add(JSON.stringify({ action: 'answer', text: draft }));
          }}
        >
          <label htmlFor={`answer-${id}`}>Câu trả lời của bạn</label>
          <textarea
            id={`answer-${id}`}
            value={draft}
            maxLength={100000}
            onChange={(e) => setDraft(e.target.value)}
            rows={8}
            required
            placeholder="Paste nội dung vào đây…"
          />
          <button disabled={busy || !!deleting || !draft.trim()}>
            {busy ? 'Đang lưu…' : 'Lưu & hiển thị'}
          </button>
        </form>
      )}
      {busy && <p role="status">Đang lưu tài liệu…</p>}
      <div className="workspace-files" aria-label="Các bài làm đã lưu">
        {items.map((item, index) => {
          const label = item.name === 'Câu trả lời' ? `Câu trả lời ${index + 1}` : item.name;
          return (
            <div className="workspace-file" key={item.id}>
              <button
                disabled={!!deleting}
                aria-pressed={selected?.id === item.id}
                onClick={() => {
                  setPreview('');
                  setSelected(item);
                }}
              >
                {label} <small>{item.kind.toUpperCase()}</small>
              </button>
              <button
                className="workspace-delete"
                aria-label={`Xoá ${label}`}
                disabled={busy || !!deleting}
                onClick={() => void remove(item, label)}
              >
                {deleting === item.id ? 'Đang xoá…' : 'Xoá'}
              </button>
            </div>
          );
        })}
      </div>
      {ready && !items.length && (
        <p className="note">Chưa có bài làm. Thêm câu trả lời đầu tiên của bạn.</p>
      )}
      {selected && (
        <article className="workspace-preview">
          <div className="workspace-actions">
            <h3>{selected.name}</h3>
            <a href={`${endpoint}&file=${selected.file}`} target="_blank" rel="noopener noreferrer">
              Mở riêng ↗
            </a>
          </div>
          {selected.kind === 'pdf' ? (
            <iframe title={selected.name} src={`${endpoint}&file=${selected.file}`} />
          ) : (
            <>
              <p className="note">
                {selected.kind === 'docx'
                  ? 'Bản đọc nội dung Word; không giữ bố cục, hình ảnh và định dạng gốc.'
                  : 'Nội dung đã lưu'}
              </p>
              <div className="workspace-text">{preview || 'Đang đọc…'}</div>
            </>
          )}
        </article>
      )}
      <div className="workspace-chat">
        <p className="eyebrow">GEMINI / TRỢ GIẢNG BÀI {id}</p>
        <p>
          Hỏi về yêu cầu bài, xin gợi ý hoặc nhận xét bài làm. Khi gửi, nội dung TXT/Word đang xem
          được gửi kèm tới Gemini. PDF chưa được gửi cho bot.
        </p>
        <div className="chat-messages" aria-live="polite">
          {history.map((m, i) => (
            <div key={i} className={`chat-message chat-${m.role}`}>
              <strong>{m.role === 'user' ? 'Bạn' : 'Gemini'}</strong>
              <div className="workspace-text">{m.text}</div>
              {m.role === 'model' && (
                <button
                  disabled={busy || !ready}
                  onClick={() => {
                    setDraft(m.text);
                    setEditing(true);
                  }}
                >
                  Dùng làm bản nháp
                </button>
              )}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void chat();
          }}
        >
          <label htmlFor={`question-${id}`}>Câu hỏi cho trợ giảng</label>
          <textarea
            id={`question-${id}`}
            rows={3}
            maxLength={8000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Giúp mình hiểu yêu cầu bài này…"
            required
          />
          <button disabled={chatBusy || !message.trim()}>
            {chatBusy ? 'Gemini đang trả lời…' : 'Gửi câu hỏi ↗'}
          </button>
        </form>
        <small>Hội thoại giữ trong lần mở trang này. Kiểm chứng phản hồi trước khi lưu bài.</small>
      </div>
      <p role="status">{status}</p>
    </section>
  );
}

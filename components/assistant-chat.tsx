'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
type Message = { role: 'user' | 'model'; text: string };
export function AssistantChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        document.getElementById('assistant-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open, onClose]);
  useEffect(() => {
    if (open && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [open, messages, busy, error]);
  useEffect(() => () => request.current?.abort(), []);
  async function send(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim() || busy) return;
    const question = draft.trim();
    const history = messages
      .slice(-12)
      .map((message) => ({ ...message, text: message.text.slice(0, 8000) }));
    const controller = new AbortController();
    request.current = controller;
    setMessages([...messages, { role: 'user', text: question }]);
    setDraft('');
    setError('');
    setBusy(true);
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ message: question, history }),
      });
      const data = await response.json();
      if (!response.ok || !data.text) throw new Error(data.error ?? 'Chưa nhận được phản hồi.');
      setMessages((previous) => [...previous, { role: 'model', text: data.text }]);
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') setError('Đã dừng phản hồi.');
      else {
        setError(e instanceof Error ? e.message : 'Không gửi được câu hỏi.');
        setDraft(question);
      }
      // A failed turn is not included in the next Gemini history.
      setMessages((previous) => previous.slice(0, -1));
    } finally {
      setBusy(false);
      request.current = null;
    }
  }
  if (!open) return null;
  return (
    <aside
      id="assistant-panel"
      className="assistant-panel"
      role="dialog"
      aria-labelledby="assistant-title"
    >
      <div className="assistant-heading">
        <div>
          <h2 id="assistant-title">Trợ lý AI</h2>
          <p>Hỏi đáp cùng Gemini</p>
        </div>
        <button
          type="button"
          aria-label="Đóng trợ lý AI"
          onClick={() => {
            onClose();
            document.getElementById('assistant-toggle')?.focus();
          }}
        >
          ×
        </button>
      </div>
      <div
        className="assistant-log"
        ref={log}
        role="log"
        aria-label="Hội thoại với Trợ lý AI"
        aria-live="polite"
        aria-busy={busy}
      >
        {messages.length === 0 && (
          <div className="assistant-welcome">
            <p>
              Xin chào! Mình là Trợ lý AI. Bạn muốn tìm hiểu bài tập, âm nhạc hay cách sử dụng AI?
            </p>
            <div>
              {[
                'Giới thiệu sáu bài tập',
                'Làm sao viết prompt rõ ràng?',
                'AI hỗ trợ sáng tạo âm nhạc thế nào?',
              ].map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => {
                    setDraft(text);
                    input.current?.focus();
                  }}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message, i) => (
          <article
            key={i}
            className={`assistant-message ${message.role === 'user' ? 'from-user' : ''}`}
          >
            <strong>{message.role === 'user' ? 'Bạn' : 'Trợ lý AI'}</strong>
            <p>{message.text}</p>
          </article>
        ))}
        {busy && <p role="status">Gemini đang trả lời…</p>}
        {error && (
          <p className="assistant-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <form className="assistant-form" onSubmit={send}>
        <label htmlFor="assistant-question">Câu hỏi của bạn</label>
        <textarea
          id="assistant-question"
          ref={input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={4000}
          rows={3}
          placeholder="Nhập câu hỏi…"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <div className="assistant-form-actions">
          <button
            type="button"
            disabled={busy || messages.length === 0}
            onClick={() => {
              setMessages([]);
              setError('');
            }}
          >
            Xóa hội thoại
          </button>
          {busy ? (
            <button type="button" onClick={() => request.current?.abort()}>
              Dừng
            </button>
          ) : (
            <button type="submit" disabled={!draft.trim()}>
              Gửi câu hỏi ↗
            </button>
          )}
        </div>
        <small>
          Câu hỏi và hội thoại được gửi tới Google Gemini khi bạn bấm Gửi. AI có thể sai; hãy kiểm
          chứng. Hội thoại chỉ giữ trong phiên trang hiện tại.
        </small>
      </form>
    </aside>
  );
}

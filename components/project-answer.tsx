'use client';

import { useEffect, useRef, useState, type ClipboardEvent } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { firebaseConfigured } from '@/src/lib/firebase';
import {
  answerRef,
  commitAnswer,
  emptyAnswer,
  imageLimit,
  imageTypes,
  prepareAnswerImage,
  validateAnswer,
  readServerAnswer,
  type AnswerImage,
  type ProjectAnswer as Answer,
} from '@/src/lib/project-answer';
import dynamic from 'next/dynamic';

const AnswerEditor = dynamic(
  () => import('./answer-editor').then((module) => module.AnswerEditor),
  { ssr: false, loading: () => <p>Đang mở nội dung…</p> },
);

type DraftImage = AnswerImage & { file?: File };
type Notice = { message: string; kind: 'info' | 'success' | 'error' };
function errorMessage(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code?.includes('permission') || code?.includes('unauthorized'))
    return 'Chưa thể truy cập bài làm. Vui lòng thử lại.';
  if (code) return 'Chưa thể hoàn tất thao tác. Vui lòng thử lại.';
  return error instanceof Error ? error.message : 'Chưa thể hoàn tất thao tác. Vui lòng thử lại.';
}
export function ProjectAnswer({ id }: { id: number }) {
  const [answer, setAnswer] = useState<Answer>(emptyAnswer);
  const [loadError, setLoadError] = useState('');
  const [retry, setRetry] = useState(0);
  const [base, setBase] = useState<Answer>(emptyAnswer);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<DraftImage[]>([]);
  const [editing, setEditing] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  function setStatus(message: string, kind: Notice['kind'] = 'info') {
    setNotice(message ? { message, kind } : null);
  }
  const [confirmDelete, setConfirmDelete] = useState(false);
  const objectUrls = useRef(new Set<string>());
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    Promise.resolve().then(() => {
      if (!active) return;
      setReady(false);
      setLoadError('');
      if (!firebaseConfigured) {
        setLoadError('Chưa thể tải bài làm. Vui lòng thử lại sau.');
        return;
      }
      const waiting = () => {
        setReady(false);
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (active) setLoadError('Chưa thể tải bài làm. Kiểm tra kết nối rồi thử lại.');
        }, 12000);
      };
      waiting();
      unsubscribe = onSnapshot(
        answerRef(id),
        { includeMetadataChanges: true },
        (snapshot) => {
          if (!active) return;
          const latest = readServerAnswer(snapshot);
          if (!latest) {
            waiting();
            return;
          }
          clearTimeout(timer);
          setAnswer(latest);
          setReady(true);
          setLoadError('');
        },
        (error) => {
          if (!active) return;
          clearTimeout(timer);
          setReady(false);
          setLoadError(errorMessage(error));
        },
      );
    });
    return () => {
      active = false;
      clearTimeout(timer);
      unsubscribe?.();
    };
  }, [id, retry]);
  useEffect(() => {
    const urls = objectUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);
  useEffect(() => {
    if (!editing) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [editing]);
  useEffect(() => {
    if (confirmDelete) dialog.current?.showModal();
    else dialog.current?.close();
  }, [confirmDelete]);
  function startEditing() {
    setBase(answer);
    setContent(answer.content);
    setImages(answer.images);
    setEditing(true);
    setStatus('');
  }
  function addImages(files: File[]) {
    const accepted = files.filter(
      (file) => imageTypes.includes(file.type) && file.size > 0 && file.size <= imageLimit,
    );
    if (accepted.length !== files.length)
      setStatus('Một số ảnh không hợp lệ. Hỗ trợ JPG, PNG, WebP, GIF tối đa 5 MB/ảnh.', 'error');
    setImages((previous) => {
      const remaining = Math.max(0, 20 - previous.length);
      return [
        ...previous,
        ...accepted.slice(0, remaining).map((file) => {
          const url = URL.createObjectURL(file);
          objectUrls.current.add(url);
          return { id: crypto.randomUUID(), url, caption: '', file };
        }),
      ];
    });
  }
  function paste(event: ClipboardEvent) {
    const files = Array.from(event.clipboardData.items)
      .filter((item) => item.kind === 'file')
      .map((item) => item.getAsFile())
      .filter((file): file is File => !!file);
    if (files.length) {
      event.preventDefault();
      addImages(files);
    }
  }
  async function save() {
    if (busy || !ready) return;
    setBusy(true);
    setStatus('Đang xử lý ảnh và lưu bài…');
    try {
      const saved: AnswerImage[] = [];
      for (const image of images) {
        const url = image.file ? await prepareAnswerImage(image.file) : image.url;
        saved.push({ id: image.id, caption: image.caption, url });
      }
      const next = { content, images: saved, revision: base.revision + 1 };
      validateAnswer(next);
      await commitAnswer(id, base, next);
      setAnswer(next);
      setStatus('Lưu bài làm thành công.', 'success');
      setEditing(false);
    } catch (error) {
      setStatus(`Lưu không thành công. ${errorMessage(error)}`, 'error');
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (busy || !ready) return;
    setBusy(true);
    setStatus('Đang xóa bài làm…');
    try {
      const next = { ...emptyAnswer, revision: base.revision + 1 };
      await commitAnswer(id, base, next);
      setAnswer(next);
      setConfirmDelete(false);
      setStatus('Xóa bài làm thành công.', 'success');
    } catch (error) {
      setStatus(`Xóa không thành công. ${errorMessage(error)}`, 'error');
    } finally {
      setBusy(false);
    }
  }
  const notification = notice && (
    <div
      className={`answer-notification answer-notification-${notice.kind}`}
      role={notice.kind === 'error' ? 'alert' : 'status'}
      aria-live={notice.kind === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <span aria-hidden="true">
        {notice.kind === 'success' ? '✓' : notice.kind === 'error' ? '!' : '…'}
      </span>
      <p>{notice.message}</p>
      {!busy && (
        <button type="button" aria-label="Đóng thông báo" onClick={() => setNotice(null)}>
          ×
        </button>
      )}
    </div>
  );
  const hasAnswer = !!answer.content || answer.images.length > 0;
  return (
    <section id="project-answer" className="exercise-workspace project-answer">
      <p className="eyebrow">BÀI {id} / BÀI LÀM CỦA TÔI</p>
      <h2>Câu trả lời & hình ảnh.</h2>
      <>
        <div className="workspace-actions">
          {ready && !editing && (
            <>
              <button disabled={!ready || busy} onClick={startEditing}>
                {hasAnswer ? 'Sửa bài làm' : '＋ Thêm bài làm'}
              </button>
              {hasAnswer && (
                <button
                  className="workspace-delete"
                  disabled={!ready || busy}
                  onClick={() => {
                    setBase(answer);
                    setStatus('');
                    setConfirmDelete(true);
                  }}
                >
                  Xóa bài làm
                </button>
              )}
            </>
          )}
        </div>
        {!ready && !loadError && <p role="status">Đang tải bài làm…</p>}
        {loadError && (
          <div role="alert">
            <p>{loadError}</p>
            <button disabled={busy} onClick={() => setRetry((value) => value + 1)}>
              Thử lại
            </button>
          </div>
        )}
        {editing ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void save();
            }}
            onPaste={paste}
          >
            <fieldset disabled={busy} className="answer-fieldset">
              <h3>01 / Câu trả lời</h3>
              <p>
                Dán nội dung từ Word hoặc nhập trực tiếp. Có thể định dạng tiêu đề, chữ đậm và danh
                sách.
              </p>
              <AnswerEditor
                key={`draft-${base.revision}`}
                content={base.content}
                editable={!busy}
                onChange={setContent}
              />
              <h3>02 / Hình ảnh</h3>
              <p>
                Dán ảnh bằng Ctrl/Cmd + V hoặc chọn ảnh từ máy. Ảnh đầu vào tối đa 5 MB, được thu
                nhỏ khi lưu. Tổng bài và ảnh tối đa 800 KB.
              </p>
              <label className="workspace-import">
                Thêm hình ảnh ({images.length}/20)
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={images.length >= 20}
                  onChange={(event) => {
                    addImages(Array.from(event.target.files ?? []));
                    event.target.value = '';
                  }}
                />
              </label>
              <div className="answer-gallery">
                {images.map((image, index) => (
                  <figure key={image.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.url} alt={image.caption || `Ảnh minh chứng ${index + 1}`} />
                    <label>
                      Chú thích ảnh {index + 1}
                      <input
                        value={image.caption}
                        maxLength={300}
                        onChange={(event) =>
                          setImages((previous) =>
                            previous.map((entry) =>
                              entry.id === image.id
                                ? { ...entry, caption: event.target.value }
                                : entry,
                            ),
                          )
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setImages((previous) => previous.filter((entry) => entry.id !== image.id))
                      }
                    >
                      Bỏ ảnh {index + 1}
                    </button>
                  </figure>
                ))}
              </div>
              <div className="workspace-actions">
                <button type="submit" disabled={!ready || busy}>
                  {busy ? 'Đang lưu…' : 'Lưu & hiển thị'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Hủy các thay đổi chưa lưu?')) setEditing(false);
                  }}
                >
                  Hủy chỉnh sửa
                </button>
              </div>
            </fieldset>
          </form>
        ) : (
          ready && (
            <article className="answer-published">
              <h3>01 / Câu trả lời</h3>
              {answer.content ? (
                <AnswerEditor
                  key={`saved-${answer.revision}`}
                  content={answer.content}
                  editable={false}
                />
              ) : (
                <p className="note">Chưa có câu trả lời.</p>
              )}
              <h3>02 / Hình ảnh</h3>
              {answer.images.length ? (
                <div className="answer-gallery">
                  {answer.images.map((image, index) => (
                    <figure key={image.id}>
                      <a
                        href={
                          /^(https?:|data:image\/(jpeg|png|webp|gif);base64,|\/)/.test(image.url)
                            ? image.url
                            : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Mở ảnh ${index + 1}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url}
                          alt={image.caption || `Ảnh minh chứng ${index + 1}`}
                          loading="lazy"
                        />
                      </a>
                      {image.caption && <figcaption>{image.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="note">Chưa có hình ảnh.</p>
              )}
            </article>
          )
        )}
      </>
      {!confirmDelete && notification}
      <dialog
        ref={dialog}
        className="answer-dialog"
        aria-labelledby={`delete-title-${id}`}
        onCancel={(event) => {
          event.preventDefault();
          if (!busy) setConfirmDelete(false);
        }}
      >
        <h3 id={`delete-title-${id}`}>Xóa bài làm {id}?</h3>
        <p>Câu trả lời và toàn bộ hình ảnh của bài này sẽ bị xóa. Không thể hoàn tác.</p>
        {confirmDelete && notification}
        <div className="workspace-actions">
          <button disabled={busy} onClick={() => setConfirmDelete(false)}>
            Giữ lại
          </button>
          <button
            disabled={!ready || busy}
            className="workspace-delete"
            onClick={() => void remove()}
          >
            {busy ? 'Đang xóa…' : 'Xác nhận xóa'}
          </button>
        </div>
      </dialog>
    </section>
  );
}

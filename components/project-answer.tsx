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
  type AnswerImage,
  type ProjectAnswer as Answer,
} from '@/src/lib/project-answer';
import dynamic from 'next/dynamic';

const AnswerEditor = dynamic(
  () => import('./answer-editor').then((module) => module.AnswerEditor),
  { ssr: false, loading: () => <p>Đang mở nội dung…</p> },
);

type DraftImage = AnswerImage & { file?: File };
function errorMessage(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code?.includes('permission') || code?.includes('unauthorized'))
    return 'Chưa thể tải bài trực tuyến. Bạn vẫn có thể chỉnh sửa trên thiết bị này.';
  if (code) return 'Chưa thể hoàn tất thao tác. Vui lòng thử lại.';
  return error instanceof Error ? error.message : 'Chưa thể hoàn tất thao tác. Vui lòng thử lại.';
}
export function ProjectAnswer({ id, initialContent }: { id: number; initialContent: string }) {
  const initialAnswer = { ...emptyAnswer, content: initialContent };
  const [answer, setAnswer] = useState<Answer>(initialAnswer);
  const [useCloud, setUseCloud] = useState(false);
  const [editingCloud, setEditingCloud] = useState(false);
  const [base, setBase] = useState<Answer>(emptyAnswer);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<DraftImage[]>([]);
  const [editing, setEditing] = useState(false);
  const [ready, setReady] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const objectUrls = useRef(new Set<string>());
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    Promise.resolve().then(() => {
      if (!active) return;
      let localAnswer = { ...emptyAnswer, content: initialContent };
      try {
        const saved = localStorage.getItem(`project-answer-test-${id}`);
        if (saved) {
          const parsed = JSON.parse(saved) as Answer;
          validateAnswer(parsed);
          localAnswer = parsed;
        }
      } catch {
        /* Keep the original answer if a local draft is invalid. */
      }
      setAnswer(localAnswer);
      setReady(true);
      if (!firebaseConfigured) return;
      unsubscribe = onSnapshot(
        answerRef(id),
        { includeMetadataChanges: true },
        (snapshot) => {
          if (!active || snapshot.metadata.fromCache) return;
          setAnswer(
            snapshot.exists()
              ? (snapshot.data() as Answer)
              : { ...emptyAnswer, content: initialContent },
          );
          setUseCloud(true);
        },
        (error) => {
          if (!active) return;
          setUseCloud(false);
          setStatus(errorMessage(error));
        },
      );
    });
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [id, initialContent]);
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
    setEditingCloud(useCloud);
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
      setStatus('Một số ảnh không hợp lệ. Hỗ trợ JPG, PNG, WebP, GIF tối đa 5 MB/ảnh.');
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
      if (editingCloud) {
        await commitAnswer(id, base, next);
        setStatus('Đã lưu bài làm.');
      } else {
        localStorage.setItem(`project-answer-test-${id}`, JSON.stringify(next));
        setAnswer(next);
        setStatus('Đã lưu bài làm trên thiết bị này.');
      }
      setEditing(false);
    } catch (error) {
      setStatus(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (busy || !ready) return;
    setBusy(true);
    setStatus('');
    try {
      const next = { ...emptyAnswer, revision: base.revision + 1 };
      if (editingCloud) await commitAnswer(id, base, next);
      else {
        localStorage.setItem(`project-answer-test-${id}`, JSON.stringify(next));
        setAnswer(next);
      }
      setConfirmDelete(false);
      setStatus(editingCloud ? 'Đã xóa bài làm.' : 'Đã xóa bài làm trên thiết bị này.');
    } catch (error) {
      setStatus(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }
  const hasAnswer = !!answer.content || answer.images.length > 0;
  return (
    <section id="project-answer" className="exercise-workspace project-answer">
      <p className="eyebrow">BÀI {id} / BÀI LÀM CỦA TÔI</p>
      <h2>Câu trả lời & hình ảnh.</h2>
      <>
        <div className="workspace-actions">
          {!editing && (
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
                    setEditingCloud(useCloud);
                    setConfirmDelete(true);
                  }}
                >
                  Xóa bài làm
                </button>
              )}
            </>
          )}
        </div>
        {!ready && !status && <p role="status">Đang tải bài làm…</p>}
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
                <button type="submit">{busy ? 'Đang lưu…' : 'Lưu & hiển thị'}</button>
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
      <p role="status" aria-live="polite">
        {status}
      </p>
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
        <div className="workspace-actions">
          <button disabled={busy} onClick={() => setConfirmDelete(false)}>
            Giữ lại
          </button>
          <button disabled={busy} className="workspace-delete" onClick={() => void remove()}>
            {busy ? 'Đang xóa…' : 'Xác nhận xóa'}
          </button>
        </div>
      </dialog>
    </section>
  );
}

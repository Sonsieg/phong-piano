'use client';

import { EditorContent, useEditor, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export function AnswerEditor({
  content,
  editable,
  onChange,
}: {
  content: string;
  editable: boolean;
  onChange?: (content: string) => void;
}) {
  let initial: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] };
  try {
    if (content) initial = JSON.parse(content);
  } catch {
    /* Empty document for invalid data. */
  }
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: !editable } })],
    content: initial,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        'aria-label': editable ? 'Soạn câu trả lời' : 'Câu trả lời đã lưu',
        class: 'answer-prose',
      },
    },
    onUpdate: ({ editor }) => onChange?.(JSON.stringify(editor.getJSON())),
  });
  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);
  return (
    <div className={editable ? 'answer-editor' : 'answer-reader'}>
      {editable && (
        <div className="answer-toolbar" role="toolbar" aria-label="Định dạng câu trả lời">
          <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>
            Đậm
          </button>
          <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>
            Nghiêng
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            Tiêu đề
          </button>
          <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
            Danh sách
          </button>
          <button type="button" onClick={() => editor?.chain().focus().undo().run()}>
            Hoàn tác
          </button>
          <button type="button" onClick={() => editor?.chain().focus().redo().run()}>
            Làm lại
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

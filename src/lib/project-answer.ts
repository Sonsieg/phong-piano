import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { getFirebase } from './firebase';

export type AnswerImage = { id: string; url: string; caption: string };
export type ProjectAnswer = { content: string; images: AnswerImage[]; revision: number };
export const emptyAnswer: ProjectAnswer = { content: '', images: [], revision: 0 };
export const imageLimit = 5 * 1024 * 1024;
export const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const answerByteLimit = 800000;
export function validateAnswer(answer: ProjectAnswer) {
  if (answer.content.length > 200000 || answer.images.length > 20)
    throw new Error('Bài tối đa 200.000 ký tự dữ liệu và 20 ảnh.');
  if (new TextEncoder().encode(JSON.stringify(answer)).length > answerByteLimit)
    throw new Error('Bài và ảnh vượt 800 KB. Hãy bớt ảnh trước khi lưu thử.');
}
export function answerRef(id: number) {
  if (!Number.isInteger(id) || id < 1 || id > 6) throw new Error('Bài tập không hợp lệ.');
  return doc(getFirebase().db, 'projectAnswers', `bai-${id}`);
}
export async function prepareAnswerImage(file: File): Promise<string> {
  if (!imageTypes.includes(file.type) || file.size > imageLimit || !file.size)
    throw new Error('Chọn ảnh JPG, PNG, WebP hoặc GIF, tối đa 5 MB.');
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Trình duyệt chưa hỗ trợ xử lý ảnh.');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.65);
  } finally {
    bitmap.close();
  }
}
export async function commitAnswer(id: number, previous: ProjectAnswer, next: ProjectAnswer) {
  validateAnswer(next);
  await runTransaction(getFirebase().db, async (transaction) => {
    const target = answerRef(id);
    const snapshot = await transaction.get(target);
    if ((snapshot.data()?.revision ?? 0) !== previous.revision)
      throw new Error('Bài đã thay đổi ở nơi khác. Hãy hủy bản nháp và mở sửa lại.');
    transaction.set(target, {
      content: next.content,
      images: next.images,
      revision: previous.revision + 1,
      updatedAt: serverTimestamp(),
    });
  });
}

import nextEnv from '@next/env';
import { loadDefaultAnswers } from './load-project-answers.mjs';

nextEnv.loadEnvConfig(process.cwd());
const project = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
if (!project) throw new Error('Chưa cấu hình Firebase project trong .env.local.');
const base = `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents`;
const writes = [];
for (const { id, content } of loadDefaultAnswers()) {
  const name = `projects/${project}/databases/(default)/documents/projectAnswers/bai-${id}`;
  const response = await fetch(`${base}/projectAnswers/bai-${id}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (response.ok) {
    console.log(`Bài ${id}: đã tồn tại, giữ nguyên.`);
    continue;
  }
  if (response.status !== 404) {
    const body = await response.json();
    console.error(
      `Không thể truy cập Firestore (${body.error?.status ?? response.status}). Cần tạo database (default) và Publish firestore.rules bằng tài khoản quản lý project. Cấu hình Web không có quyền tạo database hoặc đổi Rules.`,
    );
    process.exitCode = 1;
    break;
  }
  writes.push({
    update: {
      name,
      fields: {
        content: { stringValue: content },
        images: { arrayValue: { values: [] } },
        revision: { integerValue: '1' },
      },
    },
    updateTransforms: [{ fieldPath: 'updatedAt', setToServerValue: 'REQUEST_TIME' }],
    currentDocument: { exists: false },
  });
}
if (!process.exitCode && writes.length) {
  const response = await fetch(`${base}:commit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    const body = await response.json();
    console.error(
      `Chưa ghi được đáp án: ${body.error?.status ?? response.status}. Kiểm tra firestore.rules.`,
    );
    process.exitCode = 1;
  } else console.log(`Đã tạo ${writes.length} đáp án trong Firestore, không ghi đè bài cũ.`);
}

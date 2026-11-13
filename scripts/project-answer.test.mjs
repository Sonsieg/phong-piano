import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';

function setup({ revision = 0 } = {}) {
  const writes = [];
  const mocks = {
    './firebase': { getFirebase: () => ({ db: {} }) },
    'firebase/firestore': {
      doc: (_, collection, id) => ({ collection, id }),
      serverTimestamp: () => 'server-time',
      runTransaction: async (_, action) =>
        action({
          get: async () => ({ data: () => ({ revision }) }),
          set: (target, data) => writes.push({ target, data }),
        }),
    },
  };
  const code = ts.transpileModule(fs.readFileSync('src/lib/project-answer.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    TextEncoder,
    require: (name) => {
      if (!(name in mocks)) throw new Error(`Unexpected import: ${name}`);
      return mocks[name];
    },
  });
  return { api: exports, writes };
}

test('only lessons 1–6 have an answer document', () => {
  const { api } = setup();
  for (let id = 1; id <= 6; id++) assert.equal(api.answerRef(id).id, `bai-${id}`);
  for (const id of [0, 7, -1, 1.5, NaN]) assert.throws(() => api.answerRef(id));
});
test('save commits content, images and a new revision with server time', async () => {
  const { api, writes } = setup({ revision: 3 });
  await api.commitAnswer(2, { revision: 3 }, { content: 'answer', images: [] });
  assert.equal(writes.length, 1);
  assert.equal(writes[0].data.revision, 4);
  assert.equal(writes[0].data.updatedAt, 'server-time');
  assert.equal(writes[0].data.content, 'answer');
});
test('a stale tab cannot overwrite a newer answer', async () => {
  const { api, writes } = setup({ revision: 4 });
  await assert.rejects(
    api.commitAnswer(1, { revision: 3 }, { content: 'old', images: [] }),
    /thay đổi/,
  );
  assert.equal(writes.length, 0);
});
test('oversized answers and more than twenty images never reach a write', async () => {
  const { api, writes } = setup();
  await assert.rejects(
    api.commitAnswer(1, { revision: 0 }, { content: 'x'.repeat(200001), images: [] }),
  );
  await assert.rejects(
    api.commitAnswer(1, { revision: 0 }, { content: '', images: Array(21).fill({}) }),
  );
  assert.equal(writes.length, 0);
});
test('inline images count towards the Firestore byte budget', async () => {
  const { api, writes } = setup();
  await assert.rejects(
    api.commitAnswer(
      1,
      { revision: 0 },
      {
        content: '',
        images: [{ id: 'image', caption: '', url: 'data:image/jpeg;base64,' + 'a'.repeat(800000) }],
      },
    ),
    /800 KB/,
  );
  assert.equal(writes.length, 0);
});
test('the size check counts UTF-8 bytes for Vietnamese text', () => {
  const { api } = setup();
  assert.throws(
    () =>
      api.validateAnswer({
        content: '',
        revision: 0,
        images: [{ id: 'image', url: 'x', caption: 'ế'.repeat(300000) }],
      }),
    /800 KB/,
  );
});
test('clearing an answer keeps a revision to reject stale edits', async () => {
  const { api, writes } = setup({ revision: 2 });
  await api.commitAnswer(1, { revision: 2 }, api.emptyAnswer);
  assert.equal(writes[0].data.content, '');
  assert.equal(writes[0].data.images.length, 0);
  assert.equal(writes[0].data.revision, 3);
});
test('inline images are committed inside the same Firestore document', async () => {
  const { api, writes } = setup();
  await api.commitAnswer(
    1,
    { revision: 0 },
    {
      content: '',
      images: [{ id: 'image', caption: 'Ảnh thử', url: 'data:image/jpeg;base64,abc' }],
    },
  );
  assert.equal(writes[0].data.images[0].url, 'data:image/jpeg;base64,abc');
});

test('all six original answers convert to editable Tiptap documents', async () => {
  const { loadDefaultAnswers } = await import('./load-project-answers.mjs');
  const answers = loadDefaultAnswers();
  assert.equal(answers.length, 6);
  for (const answer of answers) {
    const document = JSON.parse(answer.content);
    assert.equal(document.type, 'doc');
    assert.ok(document.content.length > 20);
    assert.ok(answer.content.includes('Sản phẩm cuối cùng'));
    assert.ok(answer.content.includes('Công bố sử dụng AI'));
  }
  assert.ok(answers[0].content.includes('Mở This PC'));
});

test('only confirmed server snapshots provide published answers', () => {
  const { api } = setup();
  const latest = { content: 'latest answer', images: [], revision: 8 };
  const snapshot = (fromCache, hasPendingWrites, exists = true) => ({
    metadata: { fromCache, hasPendingWrites },
    exists: () => exists,
    data: () => latest,
  });
  assert.equal(api.readServerAnswer(snapshot(true, false)), null);
  assert.equal(api.readServerAnswer(snapshot(false, true)), null);
  assert.equal(api.readServerAnswer(snapshot(false, false)).revision, 8);
  const missing = api.readServerAnswer(snapshot(false, false, false));
  assert.equal(missing.content, '');
  assert.equal(missing.images.length, 0);
});

test('a newer server revision replaces the previous published content', () => {
  const { api } = setup();
  const read = (revision, content) =>
    api.readServerAnswer({
      metadata: { fromCache: false, hasPendingWrites: false },
      exists: () => true,
      data: () => ({ revision, content, images: [] }),
    });
  assert.equal(read(1, 'old').content, 'old');
  assert.equal(read(2, 'new').content, 'new');
});

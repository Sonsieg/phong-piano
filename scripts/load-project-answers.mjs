import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

export function loadDefaultAnswers() {
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    vm.runInNewContext(
      code,
      {
        exports,
        require: (name) => {
          if (!name.startsWith('@/')) throw new Error(`Unexpected data import: ${name}`);
          return load(path.resolve(`${name.slice(2)}.ts`));
        },
      },
      { filename: file },
    );
    return exports;
  }
  const { defaultProjectAnswer } = load(path.resolve('src/lib/default-project-answers.ts'));
  return Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    content: defaultProjectAnswer(index + 1),
  }));
}

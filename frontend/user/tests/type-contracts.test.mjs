import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const sourceRoot = path.resolve(new URL('../src/', import.meta.url).pathname);

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(absolutePath));
    else if (/\.tsx?$/.test(entry.name)) files.push(absolutePath);
  }
  return files;
}

test('user source expresses nullable contracts without non-null assertions', async () => {
  const assertions = [];
  const unsafeCompatibilityAssertions = [];
  for (const file of await sourceFiles(sourceRoot)) {
    const source = await fs.readFile(file, 'utf8');
    if (/\bas\s+unknown\s+as\b|\bas\s+never\b/.test(source)) {
      unsafeCompatibilityAssertions.push(path.relative(sourceRoot, file));
    }
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    function visit(node) {
      if (ts.isNonNullExpression(node)) {
        const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        assertions.push(`${path.relative(sourceRoot, file)}:${location.line + 1}:${location.character + 1}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }
  assert.deepEqual(assertions, []);
  assert.deepEqual(unsafeCompatibilityAssertions, []);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(absolutePath));
    else if (/\.tsx?$/.test(entry.name)) files.push(absolutePath);
  }
  return files;
}

test('admin source uses explicit nullable and successful-response contracts', async () => {
  const nonNullAssertions = [];
  const directStatusChecks = [];
  const unsafeCompatibilityAssertions = [];
  for (const file of await sourceFiles(sourceRoot)) {
    const source = await fs.readFile(file, 'utf8');
    const relativePath = path.relative(sourceRoot, file);
    if (relativePath !== path.join('types', 'api.ts') && /response\.code\s*[!=]==?\s*200/.test(source)) {
      directStatusChecks.push(relativePath);
    }
    if (/\bas\s+unknown\s+as\b|\bas\s+never\b/.test(source)) {
      unsafeCompatibilityAssertions.push(relativePath);
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
        nonNullAssertions.push(`${relativePath}:${location.line + 1}:${location.character + 1}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }
  assert.deepEqual(nonNullAssertions, []);
  assert.deepEqual(directStatusChecks, []);
  assert.deepEqual(unsafeCompatibilityAssertions, []);
});

test('server security settings use protocol-specific fields instead of a generic string index', async () => {
  const typeSource = await fs.readFile(path.join(sourceRoot, 'types', 'server.ts'), 'utf8');
  const componentSource = await fs.readFile(
    path.join(sourceRoot, 'components', 'server', 'ServerSecuritySettings.tsx'),
    'utf8',
  );

  assert.doesNotMatch(typeSource, /interface (?:NodeTlsSettings|EncryptionSecuritySettings|VmessTlsSettings)\s*{[^}]*\[key:\s*string\]/s);
  for (const contract of ['NodeTlsSettings', 'EncryptionSecuritySettings', 'VmessTlsSettings']) {
    assert.match(typeSource, new RegExp(`interface ${contract}\\b`));
  }
  for (const field of ['cert_mode', 'fingerprint', 'ech', 'mode', 'rtt']) {
    assert.match(typeSource, new RegExp(`\\b${field}\\?`));
  }
  assert.doesNotMatch(componentSource, /settings\.[A-Za-z_][A-Za-z0-9_]*\s+as\s+/);
  assert.match(componentSource, /function inputValue\(/);
  assert.match(componentSource, /function isEchMode\(/);
});

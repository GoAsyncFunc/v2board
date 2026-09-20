import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import parser from '@babel/parser';
import * as t from '@babel/types';

// Guard against restored modules that reference a helper (for example the
// redux connect export) that was dropped while de-splitting a bundle. Such a
// reference silently becomes an implicit global and only works by accident
// under non-strict bundling, so detect it at the AST level.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const GLOBALS = new Set([
  'module', 'exports', 'require', 'arguments', 'undefined', 'Object', 'window',
  'document', 'console', 'Math', 'JSON', 'parseInt', 'parseFloat', 'isNaN',
  'Date', 'Array', 'String', 'Number', 'Boolean', 'Promise', 'setTimeout',
  'clearTimeout', 'setInterval', 'clearInterval', 'localStorage', 'navigator',
  'location', 'Error', 'RegExp', 'Symbol', 'Map', 'Set', 'WeakMap', 'Buffer',
  'encodeURIComponent', 'decodeURIComponent', 'process', 'globalThis',
]);

async function sourceFiles(dir, out = []) {
  for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'vendor' || entry.name === 'node_modules') continue;
      await sourceFiles(full, out);
    } else if (/\.[jt]sx?$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      out.push(full);
    }
  }
  return out;
}

// Collect every lexical binding introduced anywhere in the file (declarations,
// function/class names, imports, catch params) plus browser/bundler globals.
function boundNames(ast) {
  const bound = new Set(GLOBALS);
  const visit = node => {
    if (!node || typeof node !== 'object') return;
    if (t.isVariableDeclarator(node)) {
      for (const name of Object.keys(t.getBindingIdentifiers(node.id))) bound.add(name);
    }
    if ((t.isFunctionDeclaration(node) || t.isFunctionExpression(node) ||
        t.isClassDeclaration(node) || t.isClassExpression(node)) && node.id) {
      bound.add(node.id.name);
    }
    if (t.isImportDeclaration(node)) {
      for (const specifier of node.specifiers) bound.add(specifier.local.name);
    }
    if (t.isCatchClause(node) && node.param) {
      for (const name of Object.keys(t.getBindingIdentifiers(node.param))) bound.add(name);
    }
    for (const key of Object.keys(node)) {
      if (key === 'loc' || key === 'start' || key === 'end' ||
          key === 'leadingComments' || key === 'trailingComments' ||
          key === 'innerComments' || key === 'extra') continue;
      const value = node[key];
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object' && value.type) visit(value);
    }
  };
  visit(ast);
  return bound;
}

// Identifier used as the namespace in Object(ns["key"])(...) helper lookups.
function referencedHelpers(ast) {
  const used = new Set();
  const visit = node => {
    if (!node || typeof node !== 'object') return;
    if (t.isCallExpression(node) && t.isIdentifier(node.callee, {name: 'Object'}) &&
        node.arguments[0] && t.isMemberExpression(node.arguments[0]) &&
        t.isIdentifier(node.arguments[0].object)) {
      used.add(node.arguments[0].object.name);
    }
    for (const key of Object.keys(node)) {
      if (key === 'loc' || key === 'start' || key === 'end' || key === 'extra') continue;
      const value = node[key];
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object' && value.type) visit(value);
    }
  };
  visit(ast);
  return used;
}

function droppedBindings(source) {
  const ast = parser.parse(source, {sourceType: 'module', plugins: ['jsx', 'typescript']});
  const bound = boundNames(ast);
  return [...referencedHelpers(ast)].filter(name => !bound.has(name));
}

test('restored pages bind every referenced helper alias', async () => {
  const files = [
    ...await sourceFiles(path.join(root, 'src')),
  ];
  assert.ok(files.length > 20, `expected source files, got ${files.length}`);
  assert.ok(files.some(file => file.endsWith('.tsx')), 'TSX pages must remain in the binding audit');
  assert.ok(files.some(file => file.endsWith('.ts')), 'TypeScript models must remain in the binding audit');
  const failures = [];
  for (const file of files) {
    const missing = droppedBindings(await fs.readFile(file, 'utf8'));
    if (missing.length) failures.push(`${path.relative(root, file)}: ${missing.join(', ')}`);
  }
  assert.deepEqual(failures, [], `undeclared helper bindings:\n${failures.join('\n')}`);
});

test('binding audit detects missing helpers in typed source', () => {
  assert.deepEqual(droppedBindings('const value: number = Object(missing["read"])();'), ['missing']);
  assert.deepEqual(droppedBindings('import helper from "./helper"; const view = <div>{Object(helper["read"])()}</div>;'), []);
});

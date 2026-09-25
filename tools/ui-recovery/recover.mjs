import { parse } from 'acorn';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.join(root, 'recovered-ui');
const targets = { admin: 'public/assets/admin', user: 'public/theme/default/assets' };
const bundles = ['umi.js', 'components.async.js', 'vendors.async.js'];
const hash = text => createHash('sha256').update(text).digest('hex');
const json = file => fs.readFile(file, 'utf8').then(JSON.parse);
async function write(file, text) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, text);
}
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(item => walk(item, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}
function moduleTable(ast) {
  const tables = [];
  // Inspect only the outer Webpack bootstrap or JSONP registration, never execute bundles.
  for (const statement of ast.body) {
    const call = statement.expression;
    if (call?.type !== 'CallExpression') continue;
    const arg = call.arguments[0];
    const table = arg?.type === 'ObjectExpression' ? arg
      : arg?.type === 'ArrayExpression' ? arg.elements[1] : null;
    if (table?.type === 'ObjectExpression' && table.properties.length &&
        table.properties.every(p => p.type === 'Property' && p.value.type === 'FunctionExpression')) tables.push(table);
  }
  if (tables.length !== 1) throw new Error(`Expected one Webpack module table, found ${tables.length}`);
  return tables[0];
}
async function extract() {
  try {
    await fs.access(output);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await fs.mkdir(output);
    return extractFresh();
  }
  throw new Error('recovered-ui already exists; refusing to overwrite recovered edits. Move it to a backup first.');
}
async function extractFresh() {
  for (const [target, sourceDir] of Object.entries(targets)) {
    const index = [];
    for (const bundle of bundles) {
      const source = await fs.readFile(path.join(root, sourceDir, bundle), 'utf8');
      const ast = parse(source, { ecmaVersion: 'latest', sourceType: 'script' });
      const table = moduleTable(ast);
      const folder = path.join(output, target, bundle.replace(/\.js$/, ''));
      const parts = [];
      let cursor = 0;
      for (const property of table.properties) {
        const id = String(property.key.name ?? property.key.value);
        const fn = property.value;
        const filename = `modules/${Buffer.from(id).toString('hex')}.js`;
        const code = source.slice(fn.start, fn.end);
        const literals = new Set();
        walk(fn.body, node => {
          if (node.type === 'Literal' && typeof node.value === 'string') literals.add(node.value);
        });
        const apis = [...literals].filter(v => /(?:\/api\/|\/(?:admin|user|passport|guest)\/)/.test(v));
        const routes = [...literals].filter(v => /^\/[a-zA-Z][\w/:-]*$/.test(v) && v.length < 160);
        index.push({ bundle, id, file: `${bundle.replace(/\.js$/, '')}/${filename}`, bytes: Buffer.byteLength(code), apis, routes });
        parts.push({ text: source.slice(cursor, fn.start) }, { module: filename });
        await write(path.join(folder, filename), code);
        cursor = fn.end;
      }
      parts.push({ text: source.slice(cursor) });
      await write(path.join(folder, 'manifest.json'), JSON.stringify({ source: `${sourceDir}/${bundle}`, sha256: hash(source), parts }, null, 2));
      console.log(`${target}/${bundle}: ${table.properties.length} modules`);
    }
    await write(path.join(output, target, 'index.json'), JSON.stringify(index, null, 2));
  }
}
async function build(verify) {
  for (const target of Object.keys(targets)) {
    for (const bundle of bundles) {
      const folder = path.join(output, target, bundle.replace(/\.js$/, ''));
      const manifest = await json(path.join(folder, 'manifest.json'));
      const pieces = [];
      for (const part of manifest.parts) {
        pieces.push(part.module ? await fs.readFile(path.join(folder, part.module), 'utf8') : part.text);
      }
      const code = pieces.join('');
      parse(code, { ecmaVersion: 'latest', sourceType: 'script' });
      if (verify) {
        const original = await fs.readFile(path.join(root, manifest.source));
        if (hash(code) !== manifest.sha256 || !Buffer.from(code).equals(original)) {
          throw new Error(`${target}/${bundle}: differs from original (expected after module edits)`);
        }
        console.log(`PASS ${target}/${bundle}: byte-identical, SHA-256 ${hash(code)}`);
      } else {
        await write(path.join(output, 'dist', target, bundle), code);
        console.log(`Built recovered-ui/dist/${target}/${bundle}`);
      }
    }
  }
}
try {
  const command = process.argv[2];
  if (command === 'extract') await extract();
  else if (command === 'build' || command === 'verify') await build(command === 'verify');
  else throw new Error('Usage: node recover.mjs extract|build|verify');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

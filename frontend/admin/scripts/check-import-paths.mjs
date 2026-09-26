import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * 导入路径约定守卫。
 *
 * 约定：同目录引用用 './'，任何跨目录引用一律使用 '@/...' 别名，不使用 '../'。
 *
 * 原因：从编译产物恢复源码时，模块引用只能按文件位置重建，因此留下了大量
 * '../../..' 形式的上级相对引用。这种写法无法从 import 语句看出模块归属，
 * 且移动文件会连带修改所有引用方。项目已通过 tsconfig.paths 和构建器 alias
 * 提供 '@/src' 别名，跨目录引用应统一使用别名。
 *
 * 用法：
 *   node scripts/check-import-paths.mjs          检查，发现违规时以非零码退出
 *   node scripts/check-import-paths.mjs --fix    就地改写为别名形式
 */

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = path.join(appRoot, 'src');
const shouldFix = process.argv.includes('--fix');

/**
 * 匹配 `from '../x'`、`import '../x'`（副作用导入）和 `import('../x')`，
 * 把相对当前文件的上级引用改写成 '@/' 别名。
 */
function createPatterns(file) {
    const toAlias = (specifier) => {
        const absolute = path.resolve(path.dirname(file), specifier);
        const relative = path.relative(srcRoot, absolute).split(path.sep).join('/');
        if (relative.startsWith('..')) throw new Error(`引用越出 src/: ${specifier}`);
        return `@/${relative}`;
    };
    return [
        {
            expression: /(\bfrom\s+)(['"])(\.\.\/[^'"]*)\2/g,
            replace: (match, lead, quote, specifier) =>
                `${lead}${quote}${toAlias(specifier)}${quote}`,
        },
        {
            expression: /(^\s*import\s+)(['"])(\.\.\/[^'"]*)\2/gm,
            replace: (match, lead, quote, specifier) =>
                `${lead}${quote}${toAlias(specifier)}${quote}`,
        },
        {
            expression: /(\bimport\s*\(\s*)(['"])(\.\.\/[^'"]*)\2(\s*\))/g,
            replace: (match, lead, quote, specifier, tail) =>
                `${lead}${quote}${toAlias(specifier)}${quote}${tail}`,
        },
    ];
}

async function collectSourceFiles(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        // umi's generated temp directory is not authored source
        if (entry.isDirectory() && entry.name.startsWith('.umi')) continue;
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...(await collectSourceFiles(entryPath)));
        else if (/\.tsx?$/.test(entry.name)) files.push(entryPath);
    }
    return files;
}

const violations = [];
const files = await collectSourceFiles(srcRoot);

for (const file of files) {
    const source = await fs.readFile(file, 'utf8');
    let updated = source;
    for (const { expression, replace } of createPatterns(file)) {
        updated = updated.replace(expression, replace);
    }
    if (updated === source) continue;

    const relativeFile = path.relative(appRoot, file).split(path.sep).join('/');
    for (const line of source.split('\n')) {
        if (/(?:from\s+|^\s*import\s+|import\s*\(\s*)['"]\.\.\//.test(line)) {
            violations.push({ file: relativeFile, line: line.trim() });
        }
    }
    if (shouldFix) await fs.writeFile(file, updated, 'utf8');
}

if (!violations.length) {
    console.log(`admin: import paths follow the '@/' alias convention (${files.length} files)`);
    process.exit(0);
}

const action = shouldFix ? 'rewrote' : 'found';
console.error(`admin: ${action} ${violations.length} upward relative imports`);
for (const { file, line } of violations) console.error(`  ${file}: ${line}`);
if (!shouldFix) {
    console.error('run `node scripts/check-import-paths.mjs --fix` to migrate them to the alias');
    process.exit(1);
}
console.log(`admin: migrated ${violations.length} imports to the '@/' alias`);

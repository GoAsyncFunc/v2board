import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export async function buildTarget(target) {
  if (!['user', 'admin'].includes(target)) throw Error('Unknown target');
  const source = path.join(home, target);
  const dest = path.join(home, 'dist', target);
  await fs.mkdir(dest, { recursive: true });
  await fs.cp(path.join(source, 'public'), dest, { recursive: true });
  await fs.copyFile(path.join(source, 'index.html'), path.join(dest, 'index.html'));
  const result = await build({
    absWorkingDir: home,
    entryPoints: [path.join(source, 'src/main.js')],
    outfile: path.join(dest, 'app.js'),
    bundle: true,
    sourcemap: true,
    metafile: true,
    loader: { '.js': 'jsx' },
    format: 'iife',
    platform: 'browser',
    target: 'es2018',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning'
  });
  const inputs = Object.keys(result.metafile.inputs);
  if (inputs.some(file => path.isAbsolute(file) || file.startsWith('../'))) throw Error('Build escaped frontend workspace');
  await fs.writeFile(path.join(dest, 'source-build.json'), JSON.stringify({ target, inputs, standaloneBuild: true, retainedVendorSources: true }, null, 2));
  console.log(`${target}: ${inputs.length} source/dependency files → frontend/dist/${target}/app.js`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { for (const target of ['user', 'admin']) await buildTarget(target); }
  catch (error) { console.error(error); process.exitCode = 1; }
}

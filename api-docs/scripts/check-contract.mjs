import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '../..');
const userModels = path.join(root, 'frontend/user/src/models');
const routeNames = {
  user: 'UserRoute.php',
  passport: 'PassportRoute.php',
  guest: 'GuestRoute.php',
  client: 'ClientRoute.php',
};
const legacyEndpoints = new Set(['user/tutorial/fetch']);

const source = fs
  .readdirSync(userModels)
  .filter((file) => file.endsWith('.ts'))
  .map((file) => fs.readFileSync(path.join(userModels, file), 'utf8'))
  .join('\n');

const frontendPaths = [...source.matchAll(/["'](\/(?:guest|passport|user|client)\/[^'"]+)["']/g)].map(
  (match) => match[1].split('?')[0],
);

const registered = new Set();
for (const [scope, fileName] of Object.entries(routeNames)) {
  const routeFile = path.join(root, 'app/Http/Routes/V1', fileName);
  const routeSource = fs.readFileSync(routeFile, 'utf8');
  for (const match of routeSource.matchAll(/\$router->(?:get|post|put|patch|delete|any)\s*\(\s*['"]\/([^'"]+)['"]/gi)) {
    registered.add(`${scope}/${match[1]}`);
  }
}

const endpoints = [...new Set(frontendPaths)];
const missing = endpoints.filter((endpoint) => {
  const route = endpoint.replace(/^\//, '');
  return !legacyEndpoints.has(route) && !registered.has(route);
});

console.log(`frontend endpoints: ${endpoints.length}`);
console.log(`registered routes: ${registered.size}`);
if (missing.length) {
  console.log('unregistered endpoints:');
  for (const endpoint of missing) console.log(`- ${endpoint}`);
  process.exitCode = 1;
} else {
  console.log('all static frontend endpoints matched registered routes');
}

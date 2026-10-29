import { mkdir, copyFile, cp, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') throw new Error('Unexpected output path');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const files = ['index.html', 'app.js', 'motion.js', 'story-data.js', 'favicon.svg', '.nojekyll'];
for (const name of await readdir(root)) if (name.endsWith('.css')) files.push(name);
for (const name of files) await copyFile(path.join(root, name), path.join(output, name));
const assets = path.join(root, 'assets');
await cp(assets, path.join(output, 'assets'), { recursive: true, filter: source => {
  const relative = path.relative(assets, source).replaceAll('\\', '/');
  return !relative.startsWith('scenes') && !/^(doodle-map\.png|clean-icon-\d\.png|culture-transparent\.png)$/.test(relative);
} });
console.log(`Prepared ${files.length} public files and assets in dist/`);

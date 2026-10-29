import { mkdir, copyFile, cp, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
const files = ['index.html', 'app.js', 'motion.js', 'story-data.js', 'favicon.svg', '.nojekyll'];
for (const name of await readdir(root)) if (name.endsWith('.css')) files.push(name);
for (const name of files) await copyFile(path.join(root, name), path.join(output, name));
await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
console.log(`Prepared ${files.length} public files and assets in dist/`);

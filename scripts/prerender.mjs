import { build } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const temporary = path.resolve('.prerender');
try {
  await build({ build: { ssr: 'src/App.jsx', outDir: temporary, emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'app.mjs' } } }, logLevel: 'warn' });
  const { default: App } = await import(pathToFileURL(path.join(temporary, 'app.mjs')).href);
  const html = await readFile('dist/index.html', 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error('Missing React root in built HTML.');
  await writeFile('dist/index.html', html.replace(marker, `<div id="root">${renderToString(createElement(App))}</div>`));
  console.log('Prerendered homepage for search engines and faster first paint.');
} finally { await rm(temporary, { recursive: true, force: true }); }

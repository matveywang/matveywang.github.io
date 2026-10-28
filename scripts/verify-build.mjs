import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

// Validate deployed output, including links nested several levels below the root.
const root = path.resolve('dist');
const routes = ['/', '/about/', '/research/', '/publications/', '/projects/', '/updates/', '/cv/', '/404.html'];
let resources = 0;
for (const route of routes) {
  const file = route.endsWith('.html') ? route.slice(1) : `${route.slice(1)}index.html`;
  const html = await readFile(path.join(root, file), 'utf8');
  assert.match(html, /<html[^>]*lang="en"/, `${route}: language`);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route}: exactly one h1`);
  assert.match(html, /name="description" content="[^"]+"/, `${route}: description`);
  assert.match(html, /rel="canonical" href="https:\/\/matveywang\.github\.io\//, `${route}: canonical`);
  assert.match(html, /class="skip-link"/, `${route}: skip link`);
  for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
    const value = match[1];
    assert.ok(value && value !== '#', `${route}: empty/dead link`);
    if (!value.startsWith('/')) continue;
    const url = new URL(value, 'https://matveywang.github.io');
    let target = decodeURIComponent(url.pathname).slice(1);
    if (!path.extname(target)) target = `${target.replace(/\/$/, '')}/index.html`.replace(/^\//, '');
    await access(path.join(root, target));
    resources++;
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert.match(image[0], /alt="[^"]+"/, `${route}: image alt`);
  assert.doesNotMatch(html, /href="(?:mailto:|https:\/\/example\.com)/, `${route}: fake contact or resource`);
}
await access(path.join(root, 'robots.txt'));
await access(path.join(root, 'sitemap.xml'));
console.log(`Verified ${routes.length} static pages, ${resources} local links/assets, metadata, headings, and image alt text.`);

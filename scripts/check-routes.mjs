// Run after `npm run build` and `npm run start`.
const base = 'http://localhost:3000';
const routes = [
  '/',
  '/projects',
  '/conclusion',
  ...Array.from({ length: 6 }, (_, i) => `/projects/bai-${i + 1}`),
];
const pages = new Map();
for (const route of routes) {
  const res = await fetch(base + route);
  const html = await res.text();
  if (res.status !== 200 || !html.includes('<h1') || !html.includes('2552210313')) {
    throw new Error(`Page check failed: ${route} (${res.status})`);
  }
  pages.set(route, html);
  console.log(`200 ${route}: heading and student details present`);
}
let links = 0;
for (const [route, html] of pages) {
  for (const match of html.matchAll(/href="(\/(?!\/)[^"?]*|#[^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), base + route);
    if (!pages.has(url.pathname)) continue;
    if (
      url.hash &&
      !pages.get(url.pathname).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)
    ) {
      throw new Error(`Missing anchor: ${route} -> ${match[1]}`);
    }
    links++;
  }
}
for (const asset of [
  '/images/avatar.jpeg',
  '/images/grand-piano.svg',
  '/robots.txt',
  '/sitemap.xml',
]) {
  const response = await fetch(base + asset);
  if (!response.ok) throw new Error(`Missing asset: ${asset}`);
  console.log(`200 ${asset}`);
}
const missing = await fetch(base + '/projects/khong-ton-tai');
const missingHtml = await missing.text();
// Streaming 404s may return 200; require the not-found UI and noindex metadata.
if (!missingHtml.includes('Chương này') || !missingHtml.includes('noindex')) {
  throw new Error('Missing not-found UI or noindex metadata');
}
console.log(
  `Verified ${routes.length} pages, ${links} internal links/anchors, local assets and not-found handling.`,
);

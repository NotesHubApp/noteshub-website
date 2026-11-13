/**
 * Runs after `astro build` and fails it if:
 *
 * - an address the site has published is gone. Search results, the feed,
 *   other sites and posts on social networks link to these, and nothing
 *   redirects them: a post's folder or `published` date changed, or a page
 *   renamed, would quietly turn every one of those links into a 404. Add new
 *   addresses here; remove one only with a redirect in its place.
 * - a page carries an inline script. The CSP (astro.config.mjs) allows only
 *   same-origin script files, so an inline one would ship and then be blocked
 *   in the browser, with nothing but a console error to show for it.
 */
import { readdir, readFile, stat } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);

const PUBLISHED = [
  '/',
  '/about',
  '/blog',
  '/blog/archive/2023/10/noteshub-30',
  '/blog/archive/2023/12/noteshub-31',
  '/blog/archive/2024/1/noteshub-32',
  '/blog/archive/2024/1/self-hosting-your-notes-in-git',
  '/blog/archive/2024/4/noteshub-33',
  '/blog/archive/2024/7/noteshub-34',
  '/blog/archive/2024/9/noteshub-35',
  '/blog/archive/2026/11/noteshub-agent-skill',
  '/feed.xml',
  '/sitemap.xml',
  '/robots.txt',
  // The BIMI record in noteshub.app's DNS points at the logo: mail clients fetch it from here.
  '/images/app/bimi-logo.svg',
  '/images/app/favicon.ico',
  '/images/app/icon-512.png',
  '/images/app/apple-touch-icon.png',
  '/images/app/artykul-icon.png',
];

async function exists(path) {
  const candidates = path === '/' ? ['index.html'] : [path.slice(1), `${path.slice(1)}.html`];
  for (const candidate of candidates) {
    try {
      if ((await stat(new URL(candidate, dist))).isFile()) return true;
    } catch {}
  }
  return false;
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
    if (entry.isDirectory()) yield* htmlFiles(url);
    else if (entry.name.endsWith('.html')) yield url;
  }
}

const problems = [];

for (const path of PUBLISHED) {
  if (!(await exists(path))) problems.push(`missing: ${path} was published and is no longer built`);
}

const inline = /<script\b(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>/g;
for await (const file of htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(inline)) {
    problems.push(`inline script in ${file.pathname.slice(dist.pathname.length)}: ${match[0]}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`check-build — ${PUBLISHED.length} published addresses present, no inline scripts`);

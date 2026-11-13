import type { APIRoute } from 'astro';
import { SITE } from '@/consts';

/**
 * robots.txt, from `SITE.indexable`. Crawling stays allowed either way: what
 * keeps a page out of results is its `noindex` tag, which a crawler can only
 * read if it may fetch the page. Once open, the sitemap is advertised.
 */
export const GET: APIRoute = ({ site }) => {
  const lines = ['# https://www.robotstxt.org/robotstxt.html', 'User-agent: *', 'Allow: /'];
  if (SITE.indexable) lines.push('', `Sitemap: ${new URL('/sitemap.xml', site ?? SITE.url)}`);
  return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

import type { APIRoute } from 'astro';
import { BLOG, SITE } from '@/consts';
import { getPosts, isoDate, modifiedDate, postPath } from '@/lib/blog';

/**
 * The sitemap, at `/sitemap.xml` where Search Console already reads it: every
 * page, and every post with the day it last changed. Drafts are left out, as
 * they are `noindex`, and so is the 404.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE.url);
  const url = (path: string) => new URL(path, base).toString().replaceAll('&', '&amp;');
  const posts = (await getPosts()).filter((post) => !post.data.draft);
  const latest = posts[0] ? isoDate(modifiedDate(posts[0])) : undefined;

  const entries = [
    { loc: url('/') },
    { loc: url(BLOG.path), lastmod: latest },
    { loc: url('/about') },
    ...posts.map((post) => ({ loc: url(postPath(post)), lastmod: isoDate(modifiedDate(post)) })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(({ loc, lastmod }) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

import * as env from 'utils/env';

import { Routes } from 'utils/Routes';
import { blogRepository } from './blogConfig';
import { dateToIsoString } from 'utils/dateUtils';

const sitePages = ['/', '/blog', '/about'].map(page => (
  `  <url><loc>${new URL(page, env.baseUrl).href}</loc></url>`
));

// A post with its own canonical URL is indexed at that address instead.
const blogPosts = blogRepository.getAllPublishedPostAnnotations()
  .filter(post => !post.canonicalUrl)
  .map(post => {
    const url = Routes.blogPost(post, true).replaceAll('&', '&amp;');
    const lastModified = dateToIsoString(new Date(post.modified || post.postedOn));
    return `  <url><loc>${url}</loc><lastmod>${lastModified}</lastmod></url>`;
  });

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitePages,
  ...blogPosts,
  '</urlset>',
  ''
].join('\n');

export default sitemap

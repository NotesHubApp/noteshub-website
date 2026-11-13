import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { BLOG, SITE } from '@/consts';
import { CATEGORY_LABELS, getPosts, postPath } from '@/lib/blog';

/**
 * The blog's feed, at `/feed.xml` as it always was, so subscriptions carry
 * on: each post's title, summary, date and cover, newest first, from the same
 * `getPosts()` as the index. Each item's guid is its address, as before, so
 * no reader sees an old post as new.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE.url);
  const posts = await getPosts();

  const items = await Promise.all(
    posts.map(async (post) => {
      const cover = await getImage({ src: post.data.cover, width: 1200, format: 'jpeg', quality: 85 });
      return {
        title: post.data.title,
        description: post.data.description,
        link: postPath(post),
        pubDate: post.data.published,
        categories: [CATEGORY_LABELS[post.data.category]],
        enclosure: { url: new URL(cover.src, base).toString(), length: 0, type: 'image/jpeg' },
      };
    }),
  );

  return rss({
    title: BLOG.title,
    description: BLOG.description,
    site: base,
    trailingSlash: false,
    customData: `<language>en-US</language><copyright>${new Date().getFullYear()} ${SITE.company} All rights reserved</copyright>`,
    items,
  });
};

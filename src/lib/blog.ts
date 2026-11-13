/**
 * The blog's posts as this build shows them, and what every page needs to know
 * about them. `getPosts()` is the one answer: the index, the post pages, the
 * feed, the sitemap, llms.txt and the home page's announcement all read it, so
 * none can list a post another hides.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { BLOG, showsDrafts } from '@/consts';

export type Post = CollectionEntry<'blog'>;
export type Category = Post['data']['category'];

/** What each category is called on the page, as the Next.js site named them. */
export const CATEGORY_LABELS = {
  release: 'Press Release',
  'how-to': 'How To',
} as const satisfies Record<Category, string>;

async function readPosts(): Promise<Post[]> {
  const drafts = showsDrafts();
  const posts = await getCollection('blog', (post) => drafts || !post.data.draft);
  return posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf() || a.id.localeCompare(b.id));
}

// Read once per build: the answer can't change mid-build. Not under `astro
// dev`, where a post can be added or edited between two requests.
let built: Promise<Post[]> | undefined;

/** Posts this build shows, newest first. Drafts appear only where `showsDrafts()` allows. */
export function getPosts(): Promise<Post[]> {
  if (import.meta.env.DEV) return readPosts();
  return (built ??= readPosts());
}

/**
 * `/blog/archive/2024/1/self-hosting-your-notes-in-git`: the year and month
 * the post was published, unpadded, and its folder. The Next.js site's
 * addresses, which search results, the feed and other sites already link to.
 */
export function postPath(post: Post): string {
  const date = post.data.published;
  return `${BLOG.path}/archive/${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${post.id}`;
}

/** The parts of `postPath()`, for the post page's route. */
export function postParams(post: Post): { year: string; month: string; slug: string } {
  const date = post.data.published;
  return { year: String(date.getUTCFullYear()), month: String(date.getUTCMonth() + 1), slug: post.id };
}

/** The last time the post changed: `updated` when it has one. */
export function modifiedDate(post: Post): Date {
  return post.data.updated ?? post.data.published;
}

// Frontmatter dates are calendar dates, which YAML reads as midnight UTC. Shown
// in a reader's time zone, a post published on the 20th would say the 19th
// across the Americas, so every date is formatted in UTC.
const longDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

/** "October 22, 2023", as the Next.js site wrote dates. */
export function formatDate(date: Date): string {
  return longDate.format(date);
}

/** "2023-10-22", for `<time datetime>` and the structured data. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * The blog's posts: one folder per post under src/content/blog/, with
 * `index.md` and the post's images beside it. The folder's name is the last
 * part of the post's address, `/blog/archive/<year>/<month>/<folder>`, with
 * the year and month of `published` — the addresses the Next.js site gave
 * every post, kept so no link to one breaks. Renaming a published post's
 * folder, or changing its `published` date, moves it to a new address.
 *
 * The schema is the checklist `astro check` holds every post to. It is strict,
 * so a misspelt field fails the build instead of being quietly ignored — and a
 * `slug` field, which would part the URL from the folder, is refused.
 *
 * Plain Markdown rather than MDX: older posts embed rendered Mermaid and math
 * SVGs whose `<style>` blocks MDX would read as JavaScript.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*/index.md' }),
  schema: ({ image }) =>
    z
      .strictObject({
        title: z.string().min(1),
        /** The `<title>` and link previews, when the headline is too long for them. */
        seoTitle: z.string().min(1).optional(),
        /** The meta description, the summary on the blog's index, and the feed's text. */
        description: z.string().min(1).max(160, 'Keep it to 160 characters, or search results cut it off.'),
        category: z.enum(['release', 'how-to']),
        /** Calendar dates, `2026-11-01`: read in UTC everywhere, so no time zone moves them. */
        published: z.coerce.date(),
        updated: z.coerce.date().optional(),
        /** The post's hero, its tile on the index, and its link preview. At least 1200 pixels wide. */
        cover: image(),
        coverAlt: z.string().min(1),
        draft: z.boolean().default(false),
      })
      .refine((post) => !post.updated || post.updated >= post.published, {
        message: '`updated` is earlier than `published`.',
        path: ['updated'],
      }),
});

export const collections = { blog };

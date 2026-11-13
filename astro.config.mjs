// @ts-check
import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { SITE, analyticsOrigins, recordsHeatmaps } from './src/consts';
import { remarkFigureCaption } from './src/lib/markdown/remark-figure-caption';
import { rehypeCodeBlocks } from './src/lib/markdown/rehype-code-blocks';
import { rehypePostImages } from './src/lib/markdown/rehype-post-images';

/**
 * Adds the Content Security Policy to the `/*` rule of `dist/_headers`, which
 * Cloudflare serves (public/_headers holds the rest). Into that rule, not a
 * second `/*` of its own: Cloudflare keeps only one rule per path. Written at build so the analytics
 * origin it allows is read from `SITE.analytics`, the same setting that decides
 * whether the script loads: the two can't disagree.
 *
 * Scripts only. Every script on the site is a same-origin file — Astro's
 * bundles, public/theme.js — or the analytics one, so `script-src` needs no
 * hashes, and scripts/check-build.mjs fails the build if an inline one ever
 * appears. Styles are left open on purpose: the older posts embed rendered
 * Mermaid and math SVGs with inline `style` attributes, which no hash covers.
 *
 * @returns {import('astro').AstroIntegration}
 */
function contentSecurityPolicy() {
  return {
    name: 'noteshub:content-security-policy',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const policy = [
          `script-src 'self' ${analyticsOrigins().join(' ')}`.trim(),
          `connect-src 'self' ${analyticsOrigins().join(' ')}`.trim(),
          "object-src 'none'",
          "base-uri 'self'",
          // Umami's dashboard draws its heatmaps over the live page in a frame;
          // nothing else may embed the site.
          `frame-ancestors ${recordsHeatmaps() ? SITE.analytics.umamiDashboard : "'none'"}`,
          "form-action 'none'",
          'upgrade-insecure-requests',
        ].join('; ');
        const file = new URL('_headers', dir);
        const headers = await readFile(file, 'utf8');
        if (!/^\/\*$/m.test(headers)) throw new Error('public/_headers has no `/*` rule for the CSP to join.');
        await writeFile(file, headers.replace(/^\/\*$/m, `/*\n  Content-Security-Policy: ${policy}`));
      },
    },
  };
}

export default defineConfig({
  site: SITE.url,

  // One URL per page, spelled as the Next.js export spelled it: `about.html`
  // answers `/about`, with no trailing slash and no redirect in front of it.
  // The canonical tags, the sitemap and every link in the markup agree.
  build: { format: 'file' },
  trailingSlash: 'never',

  integrations: [contentSecurityPolicy()],

  markdown: {
    // Prism marks code up with classes, which the stylesheet colours as the
    // old site did. Shiki, the default, writes inline styles.
    syntaxHighlight: 'prism',

    // The remark pipeline rather than Astro 7's default, Sätteri, because posts
    // are written in NotesHub, and render as NotesHub renders them: a single
    // newline is a line break (remark-breaks), `~` alone is not strikethrough,
    // quotes stay straight, and a titled image is a captioned figure. Code
    // blocks get their copy and wrap buttons here, at build.
    processor: unified({
      gfm: false,
      smartypants: false,
      remarkPlugins: [[remarkGfm, { singleTilde: false }], remarkBreaks, remarkFigureCaption],
      rehypePlugins: [rehypePostImages, rehypeCodeBlocks],
    }),
  },

  // Instant navigation without a client-side router: links are fetched as
  // they enter the viewport. Links to files opt out (`data-astro-prefetch`).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    build: {
      // Keep every script a file of its own, never inlined into the page, so
      // the CSP's `script-src 'self'` covers it.
      assetsInlineLimit: 0,
    },
  },
});

# CLAUDE.md

Astro 7 static site for NotesHub: the landing page, About and the blog, served
from GitHub Pages until it moves to Cloudflare Workers (README). Structure,
the blog and attribution are in README.md.

## Constraints that break silently

- **Published addresses are permanent.** Search results, the feed and other
  sites link to every page and post. `PUBLISHED` in `scripts/check-build.mjs`
  lists them and the build fails if one goes; add each new post there. A post's
  address comes from its folder name and its `published` date, so changing
  either moves it.
- **Channel links are add-only.** `CHANNEL_LINKS` in `src/lib/stores.ts` are
  in posts that can't be edited. Add names; never rename or remove one.
- **Every store link goes through `StoreLink.astro` or `storeUrl()`.** A bare
  `<a href="https://apps.apple.com/…">` loses its campaign, its tap event and
  the carry-over of an incoming campaign.
- **No inline scripts.** The CSP (`astro.config.mjs`, served from `_headers`)
  allows same-origin script files only. Behaviour goes in a component's own
  `<script>`, which Astro bundles into a file; what must run before first paint
  goes under `public/`, as `theme.js` does. `scripts/check-build.mjs` fails on
  an inline one. The JSON-LD block is data, not a script, and is fine.
- **Global class names must not collide with Prism's.** Prism marks code with
  classes like `section`, `title`, `selector` and `function`; a global
  `.section` rule once indented every `[Section]` line of an ini block. Keep
  global classes prefixed (`home-section`, `code-block`) and component styles
  scoped.
- **Scoped styles don't reach markup Astro didn't write.** Icons
  (`Icon.astro`) and HTML from `set:html` carry no scope attribute: style them
  with `:global()` under a scoped parent.
- **Markdown plugin changes need a fresh content cache.** Astro caches
  rendered posts in `node_modules/.astro/data-store.json` and doesn't notice a
  changed remark/rehype plugin. Delete that file before building.
- **Posts render as NotesHub renders them**: a newline is a line break
  (remark-breaks), and quotes stay straight. That's why the remark processor
  is used rather than Astro 7's default, Sätteri.
- **The theme keeps the old storage key.** `appTheme` = `light`, `dark` or
  `system`, so returning visitors keep their choice.
- **The owner may run `npm run dev` on port 3005** from this checkout. Build
  and preview on another port, or in a copy, while it runs.

## Conventions

- Prose in docs and comments explains *why*, not what.
- An import from another folder of `src/` goes through `@/`, never `../`.
  `astro.config.mjs` and `worker/index.ts` use relative paths.

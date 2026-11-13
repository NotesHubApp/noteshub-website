# about.noteshub.app

The landing page and blog for NotesHub. A static site built with
[Astro](https://astro.build) and TypeScript, the same toolchain as
totalfigures.app, with one small Cloudflare Worker for the `/get` links.

It was a Next.js site until November 2026. The pages look the same, and every
address it published still works: the home page, `/about`, `/blog`, each post
at `/blog/archive/<year>/<month>/<slug>`, `/feed.xml` and `/sitemap.xml`.

## Getting started

Requires Node.js 22 or newer.

```sh
npm install
npm run dev      # http://localhost:3005
```

| Command            | Does                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `npm run dev`      | Dev server with hot reload, drafts included                         |
| `npm run build`    | Type-check, build to `dist/`, then check every published address    |
| `npm run preview`  | Serve the built output                                               |
| `npx wrangler dev` | Build and serve it as Cloudflare will, with the headers and `/get`  |

## Layout

```
src/
├── consts.ts              # Site config: name, links, analytics, indexing. What .env used to hold.
├── content.config.ts      # The blog's posts: where they live, and the frontmatter each must have
├── content/blog/          # One folder per post: index.md and its images
├── layouts/Layout.astro   # <head> (meta, Open Graph, JSON-LD, theme, analytics), header, footer
├── components/
│   ├── home/              # The home page's sections
│   ├── blog/              # A post's info line, share row and download block
│   ├── StoreLink.astro    # Every link to a store, with its campaign and tap event
│   ├── Icon.astro         # The site's icons, from src/lib/icons.ts
│   └── …
├── data/                  # Home page content: highlights, features, FAQ, testimonials
├── lib/
│   ├── stores.ts          # Store URLs and campaign tokens; shared with the Worker
│   ├── blog.ts            # getPosts(), post addresses, dates
│   ├── seo.ts             # Canonical paths and the JSON-LD graph
│   └── markdown/          # The remark/rehype plugins posts render with
├── scripts/               # Client scripts: campaign carry-over, code-block buttons
├── pages/                 # Routes, plus feed.xml, sitemap.xml, robots.txt and llms.txt
└── styles/globals.css     # Colours, theme, post typography, code highlighting
public/
├── _headers               # Security and cache headers, served by Cloudflare
├── theme.js               # Applies the stored theme before first paint
└── images/app/            # Icons, and the BIMI logo mail clients fetch
worker/index.ts            # /get, /get/<channel>, /download
scripts/check-build.mjs    # Fails the build if a published address goes missing
```

## Blog

### Writing a post

One folder per post in `src/content/blog/`, named for the last part of its
address:

```
src/content/blog/noteshub-36/
├── index.md
├── nh36-hero.webp
└── nh36-search.webp
```

The post lives at `/blog/archive/<year>/<month>/<folder>`, the year and month
taken from `published`, which is how the Next.js site addressed posts. Renaming
a published post's folder or changing its `published` date moves it, and every
link to it breaks.

`astro check` holds the frontmatter to the schema in `src/content.config.ts`:

```yaml
---
title: NotesHub 3.6
description: The search snippet, the summary on the blog's index and the feed's text. 160 characters at most.
category: release # release ("Press Release") or how-to ("How To")
published: 2026-12-01 # a calendar date, read in UTC everywhere
updated: 2026-12-05 # optional
cover: ./nh36-hero.webp # the hero, the blog tile and the link preview; at least 1200px wide
coverAlt: What the cover shows.
seoTitle: A shorter title # optional: for the <title> and link previews
draft: true # optional
---
```

Posts are Markdown as NotesHub writes it: a single newline is a line break,
and an image with a title is a captioned figure:

```md
![The search panel](./nh36-search.webp "Search across notebooks")
```

Screenshots are captured at 2x, and each is shown at half its pixel width,
never wider than the column. The build makes the sizes a browser picks from,
so a phone downloads a fraction of the file. An image with no alt text is
described by its caption.

### Drafts

`draft: true` keeps a post out of production. It builds under `npm run dev`, on
Workers Builds of every branch but `main` (so it can be read at the preview
URL), and locally with `DRAFTS=1 npm run build`. A draft says so on its tile and
is always `noindex`. To publish, remove `draft` and merge to `main`.

## Campaign attribution

Every store link goes through `storeUrl()` in `src/lib/stores.ts`, tagged so
each store's console says where an install came from:

| Store            | Tag                                         | Where to read it                                       |
| ---------------- | ------------------------------------------- | ------------------------------------------------------ |
| App Store        | `pt=124679325&ct=<campaign>`                | App Store Connect › App Analytics, Campaigns            |
| Google Play      | `referrer=utm_source=…&utm_campaign=<campaign>` | Play Console, store listing acquisition by UTM      |
| Microsoft Store  | `cid=<campaign>`                            | Partner Center, the acquisitions report's campaigns    |

The web app and the Linux download have no console, so they stay plain links.

- **The site's own buttons** are credited to `web-<placement>`: `web-hero`,
  `web-comparison`, `web-testimonials`, `web-blog`. Umami counts each tap as
  "Download tap", with the store and the placement.
- **A visitor who arrives from a promotion** keeps it. `?ref=<name>` (what
  Product Hunt adds), `?utm_campaign=<name>` or `?ct=<name>` on any page is
  remembered for the visit, and every store link on every page is then credited
  to it instead (`src/scripts/campaign.ts`).
- **Links for posts and promotions**: `about.noteshub.app/get/<channel>`
  sends the visitor straight to their device's store, credited to the channel:
  the App Store on an iPhone, iPad or Mac, Google Play on Android, the
  Microsoft Store on Windows, and the home page with `?ref=<channel>`
  elsewhere. The channels are `CHANNEL_LINKS` in `src/lib/stores.ts`: threads,
  x, reddit, facebook, linkedin, bluesky, producthunt. `/get` and `/download`
  are the generic ones. A post can't be edited once it's up, so names are added,
  never renamed or removed. These need Cloudflare: GitHub Pages has no Worker.

The store links no longer send `noreferrer`, so the stores see that a visitor
came from about.noteshub.app; the Referrer-Policy header sends the origin only.

## SEO

- Each page has its own title, description, canonical URL and link preview.
  Previews are JPEG at 1200 pixels wide, which every app that draws one can
  decode; a post's preview is its cover.
- JSON-LD on every page: the organization, the site and the developer; the app
  and the FAQ on the home page; `Blog`, `BlogPosting` (by Alex Titarenko) and
  breadcrumbs on the blog.
- One `h1` per page, alt text on every screenshot, `/sitemap.xml` with each
  post's date, `/robots.txt` pointing at it, and `/llms.txt`, the site in one
  Markdown file for AI assistants.
- `SITE.indexable` in `src/consts.ts` is the one switch: `false` puts
  `noindex` on every page while leaving crawling open, so crawlers can see it.

## Deploy

### Now: GitHub Pages

`.github/workflows/publish.yml` builds `main` and publishes `dist/` to GitHub
Pages, as before. `public/CNAME` keeps the custom domain. GitHub Pages ignores
`_headers` and runs no Worker, so the security headers and the `/get` links
wait for Cloudflare.

### Moving to Cloudflare

The site is ready for Cloudflare Workers static assets, as totalfigures.app is
(`wrangler.jsonc`). A Workers custom domain needs the DNS zone on Cloudflare,
and `noteshub.app` is at Porkbun today, so:

1. Add `noteshub.app` to Cloudflare (free plan) and let it import the records.
   Before switching nameservers, compare them with Porkbun's. Keep these
   **DNS only** (grey cloud): `www` (the web app on Vercel), every mail record
   (MX, SPF, DKIM, DMARC, BIMI), and for now `about`, still pointing at
   `noteshubapp.github.io`.
2. At Porkbun, change the nameservers to the two Cloudflare names. Nothing
   moves yet: every record points where it did.
3. In Cloudflare › Workers & Pages, create a Worker from this GitHub repository
   (Workers Builds): deploy command `npx wrangler deploy`, non-production branch
   command `npx wrangler versions upload`. Push a branch and check its preview
   URL.
4. On the Worker, add the custom domain `about.noteshub.app`. Cloudflare
   replaces the `about` record with the Worker. Check the site, `/get/threads`
   from a phone, and the headers.
5. Delete `.github/workflows/publish.yml` and `public/CNAME`, and turn GitHub
   Pages off in the repository's settings.
6. Optional: turn on Crawler Hints, which tell IndexNow search engines when a
   page changes. In Search Console the sitemap stays `/sitemap.xml`.

## Analytics

Umami on our own server (`SITE.analytics` in `src/consts.ts`), cookieless, in
production builds only, and counting only `about.noteshub.app`. Events: "Download
tap" (store, placement) and "Post share" (method).

Heatmaps (`SITE.analytics.heatmaps`) add Umami's recorder: where visitors click
and how far they scroll, seen in the dashboard only as a map over all visits.
It loads once the page is idle, and only on `about.noteshub.app`. Its sample
rate and the Replays switch, which stays off, are in Umami's website settings.
The recorder needs `/recorder.js`, `/api/websites/<id>/recorder` and
`/api/record` open on `stats.alextitarenko.me`, and the dashboard's origin may
frame the site so it can draw the map over the page.

/**
 * Site-wide configuration: what the old `.env` held, and the site's switches,
 * `SITE.indexable` and `SITE.analytics`. Nothing here is secret: every value
 * ships in the pages anyway.
 *
 * Store links live in src/lib/stores.ts, which the Worker shares.
 */

export const SITE = {
  name: 'NotesHub',
  url: 'https://about.noteshub.app',

  /** The home page's <title> after the name. */
  title: 'Cross-platform, Markdown-based note-taking app',

  /** The home page's link-preview headline. */
  slogan: 'NotesHub - Take Notes, Sync and Collaborate',

  /** The line under the hero's headline and in the download block. */
  tagline: 'Fully cross-platform, vendor-agnostic, Markdown-based note-taking app',

  /**
   * The meta description: what a search result shows under the title. Longer
   * than the tagline, since a snippet has room for about 155 characters, and
   * it names what people search for.
   */
  description:
    'A cross-platform Markdown note-taking app with Kanban boards and whiteboards. Sync notes through Git, GitHub or iCloud Drive, with no vendor lock-in.',

  company: 'TALEX',
  developer: 'Alex Titarenko',
  developerUrl: 'https://www.alextitarenko.me',
  developerXUrl: 'https://x.com/al_titarenko',
  developerThreadsUrl: 'https://www.threads.com/@alex.titarenko',

  contactEmail: 'contact@noteshub.app',
  donationUrl:
    'https://www.paypal.com/donate/?business=9Q4GVXSSQXNF8&no_recurring=0&item_name=Support+my+free+software+development&currency_code=USD',

  /** NotesHub's own accounts: the footer, the structured data's `sameAs` and llms.txt read them from here. */
  social: {
    facebook: 'https://www.facebook.com/noteshubapp',
    x: 'https://twitter.com/noteshubapp',
    threads: 'https://www.threads.net/@noteshubapp',
    reddit: 'https://www.reddit.com/r/noteshub',
    linkedin: 'https://www.linkedin.com/company/noteshubapp',
  },
  twitterHandle: 'noteshubapp',

  /** The skill that lets AI agents edit NotesHub notebooks. */
  skillsRepoUrl: 'https://github.com/NotesHubApp/noteshub-skills',

  /**
   * Search-engine indexing. While `false`, every page renders `noindex,
   * nofollow`; robots.txt keeps crawling allowed either way, because a crawler
   * has to fetch a page to see its `noindex`.
   */
  indexable: true,

  analytics: {
    /**
     * Umami, on our own server: cookieless, so no consent banner. The website
     * ID is a public, write-only identifier that ships in every page, not a
     * secret. Clear it to turn analytics off.
     */
    umamiWebsiteId: '5b2bd91d-9002-424c-a389-f47cb37bc38b',
    umamiSrc: 'https://stats.alextitarenko.me/script.js',
  },
} as const;

export const BLOG = {
  path: '/blog',
  /** Unchanged from the Next.js site, so feed readers keep their subscriptions. */
  feed: '/feed.xml',
  title: `${SITE.name} Blog`,
  description: `Release notes, news and how-to guides for ${SITE.name}, the Markdown note-taking app.`,
} as const;

/** The header's links. */
export const NAV_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: BLOG.path, label: 'Blog' },
  { href: '/about', label: 'About' },
];

/** Whether the Umami script ships, and with it the tap events and the CSP allowance. */
export function isAnalyticsConfigured(): boolean {
  return SITE.analytics.umamiWebsiteId.length > 0;
}

/** Origins the analytics script loads from and sends to: the CSP in astro.config.mjs reads them. */
export function analyticsOrigins(): string[] {
  return isAnalyticsConfigured() ? [new URL(SITE.analytics.umamiSrc).origin] : [];
}

/**
 * Whether this build includes the blog's drafts: under `astro dev`, on Workers
 * Builds for any branch but `main` — so a post can be read on its preview URL
 * before it is merged — and in a local build only with `DRAFTS=1`. Never in a
 * production build. A draft is `noindex` wherever it shows.
 */
export function showsDrafts(): boolean {
  const branch = process.env.WORKERS_CI_BRANCH;
  if (branch) return branch !== 'main';
  return process.env.NODE_ENV !== 'production' || process.env.DRAFTS === '1';
}

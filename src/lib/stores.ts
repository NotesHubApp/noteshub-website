/**
 * Every link to a store or the web app, tagged so each store's own console can
 * say where an install came from. One builder for the whole site: the buttons
 * on the pages, the campaign carried over from an incoming link
 * (src/scripts/campaign.ts), the structured data, llms.txt and the `/get`
 * links' Worker (worker/index.ts) all call `storeUrl()`.
 *
 * Plain TypeScript with no Astro import, because the Worker and the browser
 * bundle import it too.
 */

export type Store = 'web' | 'app-store' | 'google-play' | 'windows' | 'linux';

/**
 * Where the visitor was sent from, in each store's terms. `campaign` is the
 * token every console groups installs by (`ct`, `utm_campaign`, `cid`), and
 * `source` is what Google Play reports beside it as `utm_source`.
 */
export interface Attribution {
  campaign: string;
  source?: string;
}

/** The site's own buttons report `utm_source=landing_page`, as the Play link always has. */
export const SITE_SOURCE = 'landing_page';

export const APP_STORE = {
  /** The numeric part of the listing's id. */
  id: '1621210753',

  /**
   * App Analytics provider token (`pt`), from App Store Connect › Analytics ›
   * Campaigns. It names the developer account, not the app, so it is the same
   * one TotalFigures' links carry. Without it the listing still opens and only
   * the attribution is lost.
   */
  providerToken: '124679325',
} as const;

export const GOOGLE_PLAY_ID = 'app.noteshub.www';
export const MICROSOFT_STORE_ID = '9PCGH6Q25F22';
export const WEB_APP_URL = 'https://www.noteshub.app';
export const LINUX_URL = 'https://github.com/NotesHubApp/noteshub-releases/releases/latest';

/**
 * A campaign token is a short name, never free text: App Store Connect keeps
 * the first 40 characters of `ct`, and an incoming link's value is untrusted.
 */
export function isCampaignToken(value: string | null | undefined): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,39}$/.test(value);
}

/**
 * The link to `store`, credited to `attribution`.
 *
 * - App Store: the campaign link Apple documents, `pt` + `ct`. App Store
 *   Connect › Analytics › Acquisition › Campaigns lists installs by `ct`.
 * - Google Play: the `referrer` parameter with UTM fields. Play Console ›
 *   Store listing acquisition breaks installs down by `utm_source` and
 *   `utm_campaign`.
 * - Microsoft Store: `cid`, which Partner Center's acquisitions report shows as
 *   a custom campaign.
 * - The web app and the Linux download have nothing to report into, so they
 *   stay plain links.
 */
export function storeUrl(store: Store, attribution: Attribution): string {
  const { campaign } = attribution;
  const source = attribution.source ?? SITE_SOURCE;

  switch (store) {
    case 'app-store': {
      const url = new URL(`https://apps.apple.com/app/apple-store/id${APP_STORE.id}`);
      url.searchParams.set('pt', APP_STORE.providerToken);
      url.searchParams.set('ct', campaign);
      url.searchParams.set('mt', '8');
      return url.toString();
    }
    case 'google-play': {
      const url = new URL('https://play.google.com/store/apps/details');
      url.searchParams.set('id', GOOGLE_PLAY_ID);
      const referrer = new URLSearchParams({
        utm_source: source,
        utm_medium: source === SITE_SOURCE ? 'website' : 'referral',
        utm_campaign: campaign,
      });
      url.searchParams.set('referrer', referrer.toString());
      return url.toString();
    }
    case 'windows': {
      const url = new URL(`https://apps.microsoft.com/detail/${MICROSOFT_STORE_ID}`);
      url.searchParams.set('cid', campaign);
      return url.toString();
    }
    case 'web':
      return WEB_APP_URL;
    case 'linux':
      return LINUX_URL;
  }
}

/**
 * The store a device installs from, read from its User-Agent, for the `/get`
 * links. An iPad's Safari says "Macintosh", which still lands on the App
 * Store; a Chromebook installs Android apps from Google Play. Anything else —
 * Linux, a crawler drawing a link preview — gets `null` and goes to the home
 * page, where every option is shown.
 */
export function storeForUserAgent(userAgent: string): Store | null {
  if (/iPhone|iPad|iPod|Macintosh/.test(userAgent)) return 'app-store';
  if (/Android|CrOS/.test(userAgent)) return 'google-play';
  if (/Windows NT/.test(userAgent)) return 'windows';
  return null;
}

/**
 * The links for posts and promotions: `/get/threads` sends a visitor to their
 * device's store credited to `threads`, so an install from a post is credited
 * to its network. `/get` alone is the generic one, credited to `web-get`.
 *
 * Once a post carries a link it can't be edited, so names are added, never
 * renamed or removed. An explicit list, not a pattern, so a typo can't open a
 * stray campaign.
 */
export const CHANNEL_LINKS = [
  'threads',
  'x',
  'reddit',
  'facebook',
  'linkedin',
  'bluesky',
  'producthunt',
] as const;

export type Channel = (typeof CHANNEL_LINKS)[number];

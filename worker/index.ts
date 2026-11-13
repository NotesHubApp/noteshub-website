/**
 * The one script on the site: the short links for posts and promotions.
 *
 *   /get/<channel>   e.g. /get/threads, credited to `threads`
 *   /get             anywhere the source doesn't matter, credited to `web-get`
 *   /download        the same, said aloud or printed, credited to `web-download`
 *
 * Each sends the visitor straight to their device's store with the campaign
 * attached (src/lib/stores.ts): the App Store on an iPhone, iPad or Mac,
 * Google Play on Android and ChromeOS, the Microsoft Store on Windows.
 * Anything else — Linux, or a crawler drawing a link preview — lands on the
 * home page with `?ref=<campaign>`, which src/scripts/campaign.ts carries to
 * whichever store link the visitor taps.
 *
 * wrangler.jsonc routes only these paths here (`run_worker_first`); every
 * other request is a static asset, which costs nothing and never touches this
 * script. A `/get/<name>` not in CHANNEL_LINKS falls through to the 404 page,
 * so a typo can't open a stray campaign. Redirects are 302s and never cached:
 * the answer depends on the device, and a post's link must keep working if a
 * store's address ever changes.
 */
import { CHANNEL_LINKS, storeForUserAgent, storeUrl } from '../src/lib/stores';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const GENERIC: Record<string, string> = {
  '/get': 'web-get',
  '/download': 'web-download',
};

function campaignFor(pathname: string): string | undefined {
  const path = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  if (path in GENERIC) return GENERIC[path];
  const channel = /^\/get\/([^/]+)$/.exec(path)?.[1];
  return channel && (CHANNEL_LINKS as ReadonlyArray<string>).includes(channel) ? channel : undefined;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const campaign = campaignFor(url.pathname);
    if (!campaign) return env.ASSETS.fetch(request);

    const store = storeForUserAgent(request.headers.get('User-Agent') ?? '');
    const location = store
      ? storeUrl(store, { campaign, source: campaign })
      : new URL(`/?ref=${encodeURIComponent(campaign)}`, url).toString();

    return new Response(null, {
      status: 302,
      headers: {
        Location: location,
        'Cache-Control': 'private, no-store',
        Vary: 'User-Agent',
        'X-Robots-Tag': 'noindex',
      },
    });
  },
};

/**
 * Carries a promotion's campaign through the site to the store.
 *
 * A visitor who arrives with `?ref=<name>` (what Product Hunt and the `/get`
 * links' fallback add), `?utm_campaign=<name>` or `?ct=<name>` keeps that name
 * for the rest of the visit, in sessionStorage, and every store link on every
 * page they open is credited to it instead of to the button. Without one, the
 * links keep the `web-<placement>` tags they were built with.
 *
 * Nothing leaves the browser: the name only rewrites links on the page.
 */
import { isCampaignToken, storeUrl, type Attribution, type Store } from '@/lib/stores';

const KEY = 'noteshub:campaign';
const STORES: ReadonlyArray<Store> = ['app-store', 'google-play', 'windows'];

function fromUrl(): Attribution | null {
  const params = new URLSearchParams(location.search);
  const campaign = params.get('ref') ?? params.get('utm_campaign') ?? params.get('ct');
  if (!isCampaignToken(campaign)) return null;
  const source = params.get('utm_source');
  return { campaign, source: isCampaignToken(source) ? source : campaign };
}

function remembered(): Attribution | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
    return value && isCampaignToken(value.campaign) && isCampaignToken(value.source) ? value : null;
  } catch {
    return null;
  }
}

const incoming = fromUrl();
if (incoming) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(incoming));
  } catch {
    // Storage blocked: the campaign holds for this page only.
  }
}

const attribution = incoming ?? remembered();
if (attribution) {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-store]')) {
    const store = link.dataset.store as Store;
    if (STORES.includes(store)) link.href = storeUrl(store, attribution);
  }
}

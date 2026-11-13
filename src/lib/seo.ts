/**
 * Everything the page head says to search engines and link previews, in one
 * place, so the claims it makes are derived from the same data as the page.
 */
import { BLOG, SITE } from '@/consts';
import { APP_STORE, GOOGLE_PLAY_ID, MICROSOFT_STORE_ID, WEB_APP_URL } from '@/lib/stores';

/**
 * The public spelling of a page's URL. Pages are built as `about.html` (see
 * `build.format` in astro.config.mjs), so `Astro.url.pathname` reads
 * `/about.html` at build time; people and crawlers use `/about`.
 */
export function canonicalPath(pathname: string): string {
  const path = pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  return path === '' ? '/' : path;
}

export type Thing = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const APP_ID = `${SITE.url}/#app`;
const DEVELOPER_ID = `${SITE.url}/#developer`;
const BLOG_URL = `${SITE.url}${BLOG.path}`;
const BLOG_ID = `${BLOG_URL}#blog`;
const LOGO = `${SITE.url}/images/app/icon-512.png`;

/**
 * Where else NotesHub is, so search engines tie its accounts and listings to
 * this site: plain listing URLs, without campaign tags, since these name the
 * listing rather than send anyone to it.
 */
const LISTINGS = [
  `https://apps.apple.com/app/id${APP_STORE.id}`,
  `https://play.google.com/store/apps/details?id=${GOOGLE_PLAY_ID}`,
  `https://apps.microsoft.com/detail/${MICROSOFT_STORE_ID}`,
  'https://github.com/NotesHubApp',
];

function organization(): Thing {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
    email: SITE.contactEmail,
    founder: { '@id': DEVELOPER_ID },
    sameAs: [...Object.values(SITE.social), ...LISTINGS],
  };
}

/** The person behind the app and every post, with his own site and accounts. */
function developer(): Thing {
  return {
    '@type': 'Person',
    '@id': DEVELOPER_ID,
    name: SITE.developer,
    url: SITE.developerUrl,
    sameAs: [SITE.developerXUrl, SITE.developerThreadsUrl],
  };
}

function website(): Thing {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'en',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/**
 * The app. No `aggregateRating` and no `review`: ratings copied from the
 * stores are exactly what Google's structured-data policy forbids. No `offers`
 * either, since the price differs by platform and store.
 */
function softwareApplication(features: ReadonlyArray<string>, image: string): Thing {
  return {
    '@type': 'SoftwareApplication',
    '@id': APP_ID,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'iOS, iPadOS, macOS, visionOS, Android, Windows, Linux, Web',
    featureList: features,
    inLanguage: 'en',
    image,
    screenshot: image,
    sameAs: [WEB_APP_URL, ...LISTINGS.slice(0, 3)],
    publisher: { '@id': ORGANIZATION_ID },
    author: { '@id': DEVELOPER_ID },
  };
}

/** The questions answered on the page, with the answers as the page shows them. */
function faqPage(items: ReadonlyArray<{ question: string; answer: string }>): Thing {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE.url}/#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** The About page, about the developer and the app's story. */
export function aboutPage(url: string): Thing {
  return {
    '@type': 'AboutPage',
    '@id': `${url}#page`,
    url,
    name: `About ${SITE.name}`,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    author: { '@id': DEVELOPER_ID },
  };
}

/** The blog. On the index it lists its posts; on a post it is what the post belongs to. */
export function blog(posts: ReadonlyArray<{ url: string; title: string; published: string }> = []): Thing {
  return {
    '@type': 'Blog',
    '@id': BLOG_ID,
    url: BLOG_URL,
    name: BLOG.title,
    description: BLOG.description,
    inLanguage: 'en',
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(posts.length > 0 && {
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        '@id': `${post.url}#article`,
        url: post.url,
        headline: post.title,
        datePublished: post.published,
      })),
    }),
  };
}

/** One post, written by the developer and published by NotesHub. */
export function blogPosting(post: {
  url: string;
  title: string;
  description: string;
  section: string;
  published: string;
  modified: string;
  image: { url: string; width: number; height: number };
}): Thing {
  return {
    '@type': 'BlogPosting',
    '@id': `${post.url}#article`,
    url: post.url,
    mainEntityOfPage: post.url,
    headline: post.title,
    description: post.description,
    articleSection: post.section,
    image: { '@type': 'ImageObject', ...post.image },
    datePublished: post.published,
    dateModified: post.modified,
    inLanguage: 'en',
    author: { '@id': DEVELOPER_ID },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': BLOG_ID },
  };
}

/** The trail from the home page to this one: Home › Blog › the post. */
export function breadcrumbs(trail: ReadonlyArray<{ name: string; url: string }>): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * The JSON-LD graph for a page: the organization, the site and the developer
 * on every page; the app and the FAQ on the home page, where they appear; and
 * whatever the page adds through `graph`.
 *
 * `<` is escaped so no string in the data can close the <script> element early.
 */
export function structuredData({
  app,
  faq = [],
  graph: extra = [],
}: {
  app?: { features: ReadonlyArray<string>; image: string };
  faq?: ReadonlyArray<{ question: string; answer: string }>;
  graph?: ReadonlyArray<Thing>;
}): string {
  const graph = [
    organization(),
    website(),
    developer(),
    ...(app ? [softwareApplication(app.features, app.image)] : []),
    ...(faq.length ? [faqPage(faq)] : []),
    ...extra,
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

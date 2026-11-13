import type { APIRoute } from 'astro';
import { BLOG, SITE } from '@/consts';
import { FAQ_ITEMS } from '@/data/faq';
import { HIGHLIGHTS } from '@/data/features';
import { getPosts, postPath } from '@/lib/blog';
import { storeUrl, type Store } from '@/lib/stores';

/**
 * llms.txt (llmstxt.org): the site in one Markdown file, for an AI assistant
 * answering a question about NotesHub. Written from the facts the pages
 * themselves read — `SITE`, the highlights, the FAQ, the posts — so it can't
 * say something the site doesn't, and a new post or answer reaches it with the
 * next build. Its store links are credited to `web-llms`.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE.url);
  const absolute = (path: string) => new URL(path, base).toString();
  const link = (store: Store) => storeUrl(store, { campaign: 'web-llms' });

  // The FAQ's answers are HTML written for the page.
  const markdown = (html: string) =>
    html
      .replace(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g, (_, href: string, text: string) => `[${text}](${absolute(href)})`)
      .replace(/<li>/g, '- ')
      .replace(/<\/?(b|strong)>/g, '**')
      .replace(/<\/?i>/g, '_')
      .replace(/<br>\n?/g, '\n')
      .replace(/<\/p>\s*<p>/g, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

  const posts = await getPosts();

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `- Web app (free): ${link('web')}`,
    `- iPhone, iPad, Mac and Apple Vision Pro: [App Store](${link('app-store')})`,
    `- Android: [Google Play](${link('google-play')})`,
    `- Windows: [Microsoft Store](${link('windows')})`,
    `- Linux: [GitHub releases](${link('linux')})`,
    '- Price: the web app is free; the native apps are a one-time purchase, with no subscription',
    `- Developer: [${SITE.developer}](${SITE.developerUrl}), an independent developer`,
    `- Contact: ${SITE.contactEmail}`,
    `- Agent skill for AI agents: [NotesHubApp/noteshub-skills](${SITE.skillsRepoUrl})`,
    '',
    '## Highlights',
    '',
    ...HIGHLIGHTS.map((highlight) => `- **${highlight.title}**: ${highlight.content}`),
    '',
    '## Pages',
    '',
    `- [${SITE.name}](${absolute('/')}): Features, a comparison of the web and native apps, reviews, and frequently asked questions.`,
    `- [About](${absolute('/about')}): Why and how ${SITE.name} was made.`,
    `- [Blog](${absolute(BLOG.path)}): ${BLOG.description}`,
  ];

  if (posts.length > 0) {
    lines.push('', '## Blog posts', '');
    for (const post of posts) {
      lines.push(`- [${post.data.title}](${absolute(postPath(post))}): ${post.data.description}`);
    }
  }

  lines.push('', '## Questions');
  for (const { question, answer } of FAQ_ITEMS) {
    lines.push('', `### ${question}`, '', markdown(answer));
  }

  lines.push(
    '',
    '## Optional',
    '',
    `- [Blog feed](${absolute(BLOG.feed)}): Every post, as RSS.`,
    `- [r/noteshub](${SITE.social.reddit}): The app's community on Reddit.`,
    `- [${SITE.name} on X](${SITE.social.x})`,
    `- [${SITE.name} on Threads](${SITE.social.threads})`,
    `- [${SITE.name} on Facebook](${SITE.social.facebook})`,
    `- [${SITE.name} on LinkedIn](${SITE.social.linkedin})`,
  );

  return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

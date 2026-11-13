/**
 * The home page's feature content: the Highlights cards, the All Features
 * list and the comparison table, ported unchanged from the Next.js site.
 */

export interface Highlight {
  title: string;
  /** The file name in src/assets/features/{desktop,mobile}/, each with a `-dark` twin. */
  image: string;
  /** What the screenshot shows, for screen readers and image search. */
  alt: string;
  content: string;
  disableImageShadow?: boolean;
}

export const HIGHLIGHTS: ReadonlyArray<Highlight> = [
  {
    title: 'Offline-First',
    image: 'offline.png',
    alt: 'The NotesHub notebook list, with a no-Wi-Fi symbol over it',
    content:
      "Whether you're soaring through the skies or exploring the wilderness, your notes will always be at your fingertips. You can even edit them, delete, add, etc. All the content will be synced once the connection is restored.",
  },
  {
    title: 'Auto Sync',
    image: 'auto-sync.png',
    alt: 'A note in the NotesHub editor beside its preview, with a sync symbol between them',
    content:
      'Your notes will be periodically synced with the remote location using built-in providers, so you can access the latest versions across all of your devices.',
  },
  {
    title: 'No Vendor Lock-In',
    image: 'no-vendor-lock-in.png',
    alt: 'Adding a GitHub repository as a new notebook in NotesHub',
    content:
      'All data is stored in your device in plain text files. You choose how to sync your data between devices: remote Git repository (including self-hosting), GitHub, file system sync, iCloud Drive, and more.',
  },
  {
    title: 'Advanced Markdown Support',
    image: 'advanced-markdown.png',
    alt: 'A Mermaid sequence diagram and a math expression in NotesHub, in Markdown and in the preview',
    content:
      'In addition to the standard Markdown syntax, we support advanced constructions such as Mermaid diagrams, LaTex math expressions, callouts, YouTube video/tweet embeds, and more.',
  },
  {
    title: 'ABC Musical Notation Support',
    image: 'abc-notation.png',
    alt: 'A tune written in ABC notation in NotesHub, with its rendered score and a player',
    content: 'Display musical scores using the ABC notation and play generated MIDI',
  },
  {
    title: 'Kanban Boards',
    image: 'kanban.png',
    alt: 'A home renovation Kanban board in NotesHub, with To Do, Doing and Blocked columns',
    content:
      'A kanban board is a tool that helps you visualize your work, and maximize your efficiency. You can use it for managing personal tasks, goals, hobbies, or learning. This will help you to organize your time, focus on what matters, and achieve more.',
  },
  {
    title: 'Whiteboards',
    image: 'whiteboard.png',
    alt: 'A brainstorming whiteboard in NotesHub, with a hand-drawn diagram',
    content:
      'A whiteboard is an infinite canvas for your creativity where you can visualize your ideas, perform brainstorming, or leave handwritten notes.',
  },
  {
    title: 'Use Everywhere',
    image: 'multi-platform.png',
    alt: 'A phone and a laptop',
    disableImageShadow: true,
    content:
      'We have native apps for all major platforms: iOS/macOS/Android/Windows. For all other scenarios you can use our web application.',
  },
  {
    title: 'Go to the Dark Side',
    image: 'dark-theme.png',
    alt: 'A note in NotesHub, split diagonally between the light and dark themes',
    content: 'You can choose between light and dark theme or system default to match with rest of the apps.',
  },
];

/** The All Features list. HTML, for the one item with a link. */
export const ALL_FEATURES = {
  features: [
    'Offline work',
    'No vendor lock-in',
    'Periodic sync of data',
    'Fully cross-platform',
    'Adaptive UI',
    'Seamless GitHub integration',
    'Git notebooks',
    'GitHub notebooks',
    'iCloud Drive notebooks*',
    'File System notebooks*',
    'Printing notes and export to PDF',
    'Kanban boards',
    'Whiteboards',
    'Dark mode',
    'Accent color picker',
    'Syntax highlighting of code blocks',
    'Support of Mermaid diagrams',
    'Support of math expressions using LaTeX notation',
    'Support of ABC musical notation',
    'Drag-and-drop files to make attachments',
    'Embed YouTube videos and tweets',
    'Find/replace inside notes',
    'Markdown preview with scroll sync',
    'Slash commands',
    'Move/copy notes across notebooks',
    'Attach/upload files on paste from clipboard',
    'Attach/upload files from local disk/storage',
    'Convert HTML content to Markdown on paste from clipboard',
    'Editor toolbar with all necessary commands (bold, list, table, etc.)',
    'Audio recording',
    'Auto-generated table of contents (TOC)',
    'Automatic merge conflicts resolution',
    'Free <a href="https://github.com/NotesHubApp/noteshub-skills" target="_blank" rel="noopener noreferrer">agent skill for NotesHub</a> that lets AI agents like Claude or Codex edit your notes',
  ],
  newFeatures: ['Search', 'Hashtags', 'Rich link previews'],
  nonReleasedFeatures: [] as string[],
};

/** Every feature as plain text, for the structured data. */
export function featureNames(): string[] {
  return [...ALL_FEATURES.newFeatures, ...ALL_FEATURES.features].map((feature) =>
    feature.replace(/<[^>]+>/g, '').replace(/\*$/, ''),
  );
}

export type FeatureStatus = 'present' | 'absent';

export interface ComparisonFeature {
  name: string;
  hint?: string;
  web: FeatureStatus;
  iOS: FeatureStatus;
  android: FeatureStatus;
  windows: FeatureStatus;
}

export const COMPARISON: ReadonlyArray<ComparisonFeature> = [
  { name: 'Git notebooks', web: 'present', iOS: 'present', android: 'present', windows: 'present' },
  { name: 'GitHub notebooks', web: 'present', iOS: 'present', android: 'present', windows: 'present' },
  {
    name: 'Large Git/GitHub notebooks',
    hint: 'Large notebooks are considered with a size of more than 5MB',
    web: 'absent',
    iOS: 'present',
    android: 'present',
    windows: 'present',
  },
  { name: 'File System notebooks', web: 'present', iOS: 'absent', android: 'present', windows: 'present' },
  { name: 'iCloud Drive notebooks', web: 'absent', iOS: 'present', android: 'absent', windows: 'absent' },
  {
    name: 'Native app experience',
    hint: 'Better dark theme support, enhanced security, system-level integration, and more...',
    web: 'absent',
    iOS: 'present',
    android: 'present',
    windows: 'present',
  },
  { name: 'More frequent data sync', web: 'absent', iOS: 'present', android: 'present', windows: 'present' },
];

/**
 * A sale, shown as a corner ribbon and as badges in the comparison table.
 * `amount` is the percentage off; leave it undefined when there is no sale.
 */
export const DISCOUNTS: { amount?: number; forAppStore: boolean; forPlayStore: boolean; forWindowsStore: boolean } = {
  amount: undefined,
  forAppStore: true,
  forPlayStore: true,
  forWindowsStore: true,
};

import { FeatureCardModel } from 'models/FeatureCardModel';

function desktopImageSrc(imageName: string) {
  return `/images/features/desktop/${imageName}`;
}

const highlights: FeatureCardModel[] = [
  {
    title: 'Offline-First',
    mobileImageSrc: '/images/features/mobile/offline.png',
    desktopImageSrc: desktopImageSrc('offline.png'),
    content: 'Whether you\'re soaring through the skies or exploring the wilderness, your notes will always be at your fingertips. You can even edit them, delete, add, etc. All the content will be synced once the connection is restored.'
  },
  {
    title: 'Auto Sync',
    mobileImageSrc: '/images/features/mobile/auto-sync.png',
    desktopImageSrc: desktopImageSrc('auto-sync.png'),
    content: 'Your notes will be periodically synced with the remote location using built-in providers, so you can access the latest versions across all of your devices.'
  },
  {
    title: 'No Vendor Lock-In',
    mobileImageSrc: '/images/features/mobile/no-vendor-lock-in.png',
    desktopImageSrc: desktopImageSrc('no-vendor-lock-in.png'),
    content: 'All data is stored in your device in plain text files. You choose how to sync your data between devices: remote Git repository (including self-hosting), GitHub, file system sync, iCloud Drive, and more.'
  },
  {
    title: 'Advanced Markdown Support',
    mobileImageSrc: 'images/features/mobile/advanced-markdown.png',
    desktopImageSrc: 'images/features/desktop/advanced-markdown.png',
    content: 'In addition to the standard Markdown syntax, we support advanced constructions such as Mermaid diagrams, LaTex math expressions, callouts, YouTube video/tweet embeds, and more.'
  },
  {
    title: 'ABC Musical Notation Support',
    mobileImageSrc: 'images/features/mobile/abc-notation.png',
    desktopImageSrc: 'images/features/desktop/abc-notation.png',
    content: 'Display musical scores using the ABC notation and play generated MIDI'
  },
  {
    title: 'Kanban Boards',
    mobileImageSrc: '/images/features/mobile/kanban.png',
    desktopImageSrc: desktopImageSrc('kanban.png'),
    content: 'A kanban board is a tool that helps you visualize your work, and maximize your efficiency. You can use it for managing personal tasks, goals, hobbies, or learning. This will help you to organize your time, focus on what matters, and achieve more.'
  },
  // {
  //   title: 'Whiteboards',
  //   mobileImageSrc: '',
  //   desktopImageSrc: desktopImageSrc('whiteboard.png'),
  //   content: '???'
  // },
  {
    title: 'Use Everywhere',
    mobileImageSrc: '/images/features/mobile/multi-platform.png',
    desktopImageSrc: desktopImageSrc('multi-platform.png'),
    disableImageShadow: true,
    content: 'We have native apps for all major platforms: iOS/macOS/Android/Windows. For all other scenarios you can use our web application.'
  },
  {
    title: 'Go to the Dark Side',
    mobileImageSrc: '/images/features/mobile/dark-theme.png',
    desktopImageSrc: desktopImageSrc('dark-theme.png'),
    content: 'You can choose between light and dark theme or system default to match with rest of the apps.'
  },
  /*{
    title: 'Collaborate',
    mobileImageSrc: '/images/features/placeholder-feature.jpg',
    desktopImageSrc: '/images/features/placeholder-feature.jpg',
    content: 'Since your notes stored in Git repositories, the collaboration comes naturaly, just add new collaborators to your remote repository. Native support comes in future updates.'
  }*/
]

export default highlights;

import { FeatureCardModel } from 'models/FeatureCardModel';

function getMobileImage(imageName: string) {
  return `/images/features/mobile/${imageName}`;
}

function getDesktopImage(imageName: string) {
  return `/images/features/desktop/${imageName}`;
}

const highlights: FeatureCardModel[] = [
  {
    title: 'Offline-First',
    mobileImageSrc: getMobileImage('offline.png'),
    desktopImageSrc: getDesktopImage('offline.png'),
    content: 'Whether you\'re soaring through the skies or exploring the wilderness, your notes will always be at your fingertips. You can even edit them, delete, add, etc. All the content will be synced once the connection is restored.'
  },
  {
    title: 'Auto Sync',
    mobileImageSrc: getMobileImage('auto-sync.png'),
    desktopImageSrc: getDesktopImage('auto-sync.png'),
    content: 'Your notes will be periodically synced with the remote location using built-in providers, so you can access the latest versions across all of your devices.'
  },
  {
    title: 'No Vendor Lock-In',
    mobileImageSrc: getMobileImage('no-vendor-lock-in.png'),
    desktopImageSrc: getDesktopImage('no-vendor-lock-in.png'),
    content: 'All data is stored in your device in plain text files. You choose how to sync your data between devices: remote Git repository (including self-hosting), GitHub, file system sync, iCloud Drive, and more.'
  },
  {
    title: 'Advanced Markdown Support',
    mobileImageSrc: getMobileImage('advanced-markdown.png'),
    desktopImageSrc: getDesktopImage('advanced-markdown.png'),
    content: 'In addition to the standard Markdown syntax, we support advanced constructions such as Mermaid diagrams, LaTex math expressions, callouts, YouTube video/tweet embeds, and more.'
  },
  {
    title: 'ABC Musical Notation Support',
    mobileImageSrc: getMobileImage('abc-notation.png'),
    desktopImageSrc: getDesktopImage('abc-notation.png'),
    content: 'Display musical scores using the ABC notation and play generated MIDI'
  },
  {
    title: 'Kanban Boards',
    mobileImageSrc: getMobileImage('kanban.png'),
    desktopImageSrc: getDesktopImage('kanban.png'),
    content: 'A kanban board is a tool that helps you visualize your work, and maximize your efficiency. You can use it for managing personal tasks, goals, hobbies, or learning. This will help you to organize your time, focus on what matters, and achieve more.'
  },
  {
    title: 'Whiteboards',
    mobileImageSrc: getMobileImage('whiteboard.png'),
    desktopImageSrc: getDesktopImage('whiteboard.png'),
    content: 'A whiteboard is an infinite canvas for your creativity where you can visualize your ideas, perform brainstorming, or leave handwritten notes.'
  },
  {
    title: 'Use Everywhere',
    mobileImageSrc: getMobileImage('multi-platform.png'),
    desktopImageSrc: getDesktopImage('multi-platform.png'),
    disableImageShadow: true,
    content: 'We have native apps for all major platforms: iOS/macOS/Android/Windows. For all other scenarios you can use our web application.'
  },
  {
    title: 'Go to the Dark Side',
    mobileImageSrc: getMobileImage('dark-theme.png'),
    desktopImageSrc: getDesktopImage('dark-theme.png'),
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

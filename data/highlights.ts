import { FeatureCardModel } from 'models/FeatureCardModel';

const highlights: FeatureCardModel[] = [
  {
    title: 'Work Offline',
    mobileImageSrc: '/images/features/mobile/offline.png',
    desktopImageSrc: '/images/features/desktop/offline.png',
    content: 'If you are in an airplane or traveling in a forest, it does not matter, your notes will be always with you. You can even edit them, delete, add, etc. All the content will be synced once the connection is restored.'
  },
  {
    title: 'Auto Sync',
    mobileImageSrc: '/images/features/mobile/auto-sync.png',
    desktopImageSrc: '/images/features/desktop/auto-sync.png',
    content: 'Your notes will be periodically synced with the remote location, so you can access the latest versions across all of your devices.'
  },
  {
    title: 'No Vendor Lock-In',
    mobileImageSrc: '/images/features/mobile/no-vendor-lock-in.png',
    desktopImageSrc: '/images/features/desktop/no-vendor-lock-in.png',
    content: 'All data stored in your device in plain text files. You choose how to sync your data between devices: remote Git repository (including self-hosting), GitHub, file system sync, iCloud Drive and more.'
  },
  {
    title: 'Merge Conflicts Auto-Resolution',
    mobileImageSrc: '/images/features/mobile/merge-conflicts-auto-resolution.png',
    desktopImageSrc: '/images/features/desktop/merge-conflicts-auto-resolution.png',
    content: 'Don\'t be afraid to edit the same notes from different devices even when you are offline. Once connection is restored your notes will be automatically merged. If the same lines changed you will see an alternative variant in the note.'
  },
  {
    title: 'Kanban Boards',
    mobileImageSrc: '/images/features/mobile/kanban.png',
    desktopImageSrc: '/images/features/desktop/kanban.png',
    content: 'A kanban board is a tool that helps you visualize your work, and maximize your efficiency. You can use it for managing personal tasks, goals, hobbies, or learning. This will help you to organize your time, focus on what matters, and achieve more.'
  },
  {
    title: 'Use Everywhere',
    mobileImageSrc: '/images/features/mobile/multi-platform.png',
    desktopImageSrc: '/images/features/desktop/multi-platform.png',
    disableImageShadow: true,
    content: 'We have native apps for all major platforms: iOS/macOS/Android/Windows. For all other scenarios you can use our web application.'
  },
  {
    title: 'Go to the Dark Side',
    mobileImageSrc: '/images/features/mobile/dark-theme.png',
    desktopImageSrc: '/images/features/desktop/dark-theme.png',
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

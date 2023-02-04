import { FeatureCardData } from '../models/FeatureCardData';


const sections: FeatureCardData[] = [
  {
    title: 'Work Offline',
    mobileImageSrc: '/images/features/mobile/offline.png',
    desktopImageSrc: '/images/features/desktop/offline.png',
    content: 'If you are in an airplane or traveling in a forest, it does not matter, your notes will be always with you. You can even edit them, delete, add, etc. All the content will be sync once connection is restored.'
  },
  {
    title: 'Auto Sync',
    mobileImageSrc: '/images/features/mobile/auto-sync.png',
    desktopImageSrc: '/images/features/desktop/auto-sync.png',
    content: 'Your notes will be periodically sync with remote location, so you can access latest versions across all of your devices.'
  },
  {
    title: 'No Vendor Lock-In',
    mobileImageSrc: '/images/features/mobile/no-vendor-lock-in.png',
    desktopImageSrc: '/images/features/desktop/no-vendor-lock-in.png',
    content: 'All data stored in your device and sync with remote Git repositories. Choose GitHub or any other Git provider.'
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
    content: 'Use Kanban boards as a tool for workflow visualization, which is designed to help bring clarity to your work progress and enhance efficiency.'
  },
  {
    title: 'Use Everywhere',
    mobileImageSrc: '/images/features/mobile/multi-platform.png',
    desktopImageSrc: '/images/features/desktop/multi-platform.png',
    disableImageShadow: true,
    content: 'The application is built with love and using the latest web technologies (PWA). It means that it can work in any mobile device, desktop, or any other device with modern web browser. The app works offline and can be installed. Works and feels like native app without compromises.'
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

export default sections;

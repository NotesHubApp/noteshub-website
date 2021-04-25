import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import FeatureCard from './common/FeatureCard';

type FeatureCardData = {
  title: string;
  imageSrc: string;
  content: ReactNode | string;
}

const useStyles = createUseStyles({
  notableFeaturesContainer: {
    width: '100%'
  },
  header: {
    textAlign: 'center'
  }
});

export default function NotableFeatures() {
  const classes = useStyles();

  const sections: FeatureCardData[] = [
    {
      title: 'Work Offline',
      imageSrc: '/images/features/placeholder-feature.jpg',
      content: 'If you are in an airplane or traveling in a forest, it does not matter, your notes will be always with you. You can even edit them, delete, add. All the content will be sync once connection is restored.'
    },
    {
      title: 'Auto Sync',
      imageSrc: '/images/features/placeholder-feature.jpg',
      content: ''
    },
    {
      title: 'No Vendor Lock-In',
      imageSrc: '/images/features/placeholder-feature.jpg',
      content: ''
    },
    {
      title: 'Merge Conflicts Auto-Resolution',
      imageSrc: '/images/features/placeholder-feature.jpg',
      content: ''
    },
    {
      title: 'Use Everywhere',
      imageSrc: '/images/features/placeholder-feature.jpg',
      content: ''
    },
    {
      title: 'Go to the Dark Side',
      imageSrc: '/images/features/placeholder-feature.jpg',
      content: ''
    },
    {
      title: 'Collaborate',
      imageSrc: '/images/features/placeholder-feature.jpg',
      content: ''
    }
  ]

  return (
    <div className={ classes.notableFeaturesContainer }>
      <h1 className={ classes.header }>Features</h1>

      { sections.map((v, index) => (
        <FeatureCard title={ v.title } imageSrc={ v.imageSrc } isAlternate={ index % 2 == 1 }>
          { v.content }
        </FeatureCard>
      ))}
    </div>
  );
}

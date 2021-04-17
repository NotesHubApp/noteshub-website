import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import Section from './common/Section';

type SectionData = {
  title: string;
  imageSrc: string;
  content: ReactNode | string;
}

const useStyles = createUseStyles({
  notableFeatures: {
    width: '100%'
  },
});

export default function NotableFeatures() {
  const classes = useStyles();

  const sections: SectionData[] = [
    {
      title: 'Work Offline',
      imageSrc: '/',
      content: ''
    },
    {
      title: 'Auto Sync',
      imageSrc: '/',
      content: ''
    },
    {
      title: 'No Vendor Lock-In',
      imageSrc: '/',
      content: ''
    },
    {
      title: 'Merge Conflicts Auto-Resolution',
      imageSrc: '/',
      content: ''
    },
    {
      title: 'Use Everywhere',
      imageSrc: '/',
      content: ''
    },
    {
      title: 'Go to the Dark Side',
      imageSrc: '/',
      content: ''
    },
    {
      title: 'Collaborate',
      imageSrc: '/',
      content: ''
    }
  ]

  return (
    <div className={ classes.notableFeatures }>
      { sections.map((v, index) => (
        <Section title={ v.title } imageSrc={ v.imageSrc } isAlternate={ index % 2 == 1 }>
          { v.content }
        </Section>
      ))}
    </div>
  );
}

import React from 'react';
import { createUseStyles } from 'react-jss';
import Section from './common/Section';

const useStyles = createUseStyles({
  notableFeatures: {
    width: '100%'
  },
});

export default function NotableFeatures() {
  const classes = useStyles();

  return (
    <div className={ classes.notableFeatures }>
      <Section title="Work Offline" imageSrc="/">
      </Section>
      <Section title="Auto Sync" imageSrc="/">
      </Section>
      <Section title="No Vendor Lock-In" imageSrc="/">

      </Section>
      <Section title="Merge Conflicts Auto-Resolution" imageSrc="/">

      </Section>
      <Section title="Use Everywhere" imageSrc="/">
      </Section>
      <Section title="Go to the Dark Side" imageSrc="/">
      </Section>
      <Section title="Collaborate" imageSrc="/">
      </Section>
    </div>
  );
}

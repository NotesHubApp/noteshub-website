import React from 'react';
import { createUseStyles } from 'react-jss';
import FeatureCard from './common/FeatureCard';
import { SectionTitle } from './common/SectionTitle';
import sections from '../data/highlights';


const useStyles = createUseStyles({
  notableFeaturesContainer: {
    width: '100%'
  }
});

export default function Highlights() {
  const classes = useStyles();

  return (
    <div className={ classes.notableFeaturesContainer }>
      <SectionTitle>Highlights</SectionTitle>

      { sections.map((v, index) => (
        <FeatureCard
          key={ v.title }
          title={ v.title }
          mobileImageSrc={ v.mobileImageSrc }
          desktopImageSrc={ v.desktopImageSrc }
          disableImageShadow={ v.disableImageShadow }
          isAlternate={ index % 2 == 1 }>
          { v.content }
        </FeatureCard>
      ))}
    </div>
  );
}

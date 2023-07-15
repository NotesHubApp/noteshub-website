import FeatureCard from './FeatureCard';
import { FeatureCardModel } from 'models/FeatureCardModel';
import React from 'react';
import { SectionTitle } from './SectionTitle';
import { createUseStyles } from 'react-jss';
import highlightsData from 'data/highlights';

const useStyles = createUseStyles({
  notableFeaturesContainer: {
    width: '100%'
  }
});

type HighlightsProps = {
  highlights?: FeatureCardModel[]
}

export default function Highlights({ highlights = highlightsData } : HighlightsProps) {
  const classes = useStyles();

  return (
    <div className={ classes.notableFeaturesContainer }>
      <SectionTitle>Highlights</SectionTitle>

      { highlights.map((v, index) => (
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

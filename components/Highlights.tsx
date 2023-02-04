import React from 'react';
import { createUseStyles } from 'react-jss';
import FeatureCard from './common/FeatureCard';
import { SectionTitle } from './common/SectionTitle';
import highlightsData from 'data/highlights';
import { FeatureCardModel } from 'models/FeatureCardModel';


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

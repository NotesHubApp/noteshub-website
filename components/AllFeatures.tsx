import { createUseStyles } from 'react-jss';
import { Section } from './common/Section';
import { SectionTitle } from './common/SectionTitle';
import {
  features as featuresData,
  nonReleasedFeatures as nonReleasedFeaturesData
} from '../data/allFeatures';


const useStyles = createUseStyles({
  featuresList: {
    columnCount: '2',
    columnGap: '50px',
    textAlign: 'start',
    listStyle: 'none',
    padding: '0 20px',

    '@media only screen and (max-width: 800px)': {
      columnCount: '1'
    },

    '& li': {
      lineHeight: '200%',
      paddingLeft: '30px',

      '&::before': {
        display: 'inline-block',
        content: '"•"',
        color: 'var(--theme-color)',
        width: '1em',
        marginLeft: '-1em',
        fontWeight: 'bold'
      }
    }
  },
  comingSoonLabel: {
    cursor: 'help',
    fontSize: '60%',
    color: 'white',
    background: 'var(--theme-color)',
    borderRadius: '10px',
    padding: '2px 7px',
    marginLeft: '5px'
  }
});

type AllFeaturesProps = {
  features?: string[]
  nonReleasedFeatures?: string[]
}

export default function AllFeatures({
  features = featuresData,
  nonReleasedFeatures = nonReleasedFeaturesData
} : AllFeaturesProps) {
  const classes = useStyles();

  return (
    <Section id='all-features'>
      <SectionTitle>All Features</SectionTitle>

      <ul className={classes.featuresList}>
        { features.map((x, i) => (<li key={i}>{ x }</li>)) }
        { nonReleasedFeatures.map((x, i) => (
          <li key={features.length + i}>
            { x }
            <span
              className={classes.comingSoonLabel}
              title="This feature planned to be released in future release"
            >
              coming
            </span>
          </li>)) }
      </ul>
    </Section>
  )
}

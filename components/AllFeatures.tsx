import { Section } from './common/Section';
import { SectionTitle } from './common/SectionTitle';
import { allFeatures } from '../data/allFeatures';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  featuresList: {
    columnCount: '2',
    columnGap: '50px',
    textAlign: 'start',
    listStyle: 'none',
    padding: '0 20px',
    fontSize: '1.1em',

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
  label: {
    cursor: 'help',
    fontSize: '60%',
    color: 'white',
    background: 'var(--theme-color)',
    borderRadius: '10px',
    padding: '2px 7px',
    marginLeft: '5px',
    verticalAlign: 'bottom',
    textTransform: 'uppercase'
  },
  comingLabel: {
    background: 'gray'
  }
});

type AllFeaturesProps = {
  data?: {
    features: string[]
    newFeatures: string[]
    nonReleasedFeatures: string[]
  }
}

export default function AllFeatures({ data = allFeatures }: AllFeaturesProps) {
  const classes = useStyles();

  return (
    <Section id='all-features'>
      <SectionTitle>All Features</SectionTitle>

      <ul className={classes.featuresList}>
      { data.newFeatures.map((x, i) => (
          <li key={data.newFeatures.length + i}>
            { x }
            <span
              className={classes.label}
              title="This feature just released"
            >
              new
            </span>
          </li>))
        }
        { data.features.map((x, i) => (<li key={i}>{ x }</li>)) }
        { data.nonReleasedFeatures.map((x, i) => (
          <li key={data.features.length + i}>
            { x }
            <span
              className={clsx(classes.label, classes.comingLabel)}
              title="This feature planned to be released in future release"
            >
              coming
            </span>
          </li>))
        }
      </ul>
    </Section>
  )
}

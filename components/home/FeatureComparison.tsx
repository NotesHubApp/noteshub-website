import { createUseStyles } from 'react-jss';
import { ComparisonFeatureModel, FeatureStatus } from 'models/ComparisonFeatureModel';
import allFeatures from 'data/comparisonFeatures';
import { ExternalLink } from '../common/ExternalLink';
import { Hint } from '../common/Hint';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import { RecommendedIcon } from 'components/icons';

const useStyles = createUseStyles({
  tableWrap: {
    maxWidth: '100%',
    overflowX: 'auto',
    wordBreak: 'initial',
    whiteSpace: 'nowrap'
  },
  comparisonTable: {
    borderCollapse: 'collapse',
    width: '100%',

    '& thead tr th:first-child': {
      textAlign: 'left'
    },
    '& tr th': {
      padding: '20px',
    },
    '& tbody tr th': {
      padding: '20px',
      textAlign: 'left',
      fontWeight: 'normal'
    },
    '& tr th, tr hd': {
      minWidth: '100px'
    }
  },
  columnCaption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '7px'
  },
  alternateRow: {
    backgroundColor: 'var(--alternative-raw-color)',
  },
  platformLink: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  featureNameContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    '& svg': {
      flexShrink: 0
    }
  },
  featureStatus: {
    width: '1.5em',
    height: '1.5em'
  },
  recommendedIcon: {
    width: '35px',
    height: '35px',
    fill: 'var(--text-primary)'
  }
})


type FeatureComparisonProps = {
  features?: ComparisonFeatureModel[]
}

export default function FeatureComparison({ features = allFeatures }: FeatureComparisonProps) {
  const classes = useStyles();

  return (
    <Section id='feature-comparison'>
      <SectionTitle>Feature Comparison</SectionTitle>

      <div className={ classes.tableWrap }>
        <table className={ classes.comparisonTable }>
          <thead>
            <tr>
              <th>Included Features</th>
              <th>
                <ExternalLink href={ process.env.NEXT_PUBLIC_APPURL } className={ classes.platformLink }>
                  Web
                </ExternalLink>
              </th>
              <th>
                <div className={ classes.columnCaption }>
                  <ExternalLink href={ process.env.NEXT_PUBLIC_APPSTORE_APPURL } className={ classes.platformLink }>
                    iOS / macOS
                  </ExternalLink>
                  <RecommendedBadge />
                </div>
              </th>
              <th>
                <div className={ classes.columnCaption }>
                  <ExternalLink href={ process.env.NEXT_PUBLIC_GOOGLEPLAY_APPURL } className={ classes.platformLink }>
                    Android
                  </ExternalLink>
                  <RecommendedBadge />
                </div>
              </th>
              <th>
                <div className={ classes.columnCaption }>
                  <ExternalLink href={ process.env.NEXT_PUBLIC_WINDOWSSTORE_APPURL } className={ classes.platformLink }>
                    Windows
                  </ExternalLink>
                  <RecommendedBadge />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            { features.map((feature, index) => (
              <tr key={ feature.name } className={ index % 2 === 0 ? classes.alternateRow : '' }>
                <th>
                  <div className={ classes.featureNameContainer }>
                    <span>{ feature.name }</span>
                    { feature.hint && <Hint>{ feature.hint }</Hint> }
                  </div>
                </th>
                <td><FeatureStatus status={ feature.web } /></td>
                <td><FeatureStatus status={ feature.iOS } /></td>
                <td><FeatureStatus status={ feature.android } /></td>
                <td><FeatureStatus status={ feature.windows } /></td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </Section>
  )
}

function FeatureStatus(props: { status: FeatureStatus }) {
  const classes = useStyles();

  const Present = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--theme-color)" className={ classes.featureStatus } viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
  )

  const Absent = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d0d0d0" className={ classes.featureStatus } viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>
  )

  return props.status === 'present' ? Present : Absent
}

function RecommendedBadge() {
  const classes = useStyles();

  return (
    <RecommendedIcon
      className={ classes.recommendedIcon }
      title='Recommended'
    />
  )
}

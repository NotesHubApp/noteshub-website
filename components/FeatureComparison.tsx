import { createUseStyles } from 'react-jss';
import { Hint } from './common/Hint';
import { Section } from './common/Section';
import { SectionTitle } from './common/SectionTitle';

const useStyles = createUseStyles({
  tableWrap: {
    maxWidth: '100%',
    overflowX: 'auto',
    wordBreak: 'initial'
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
    }
  },
  alternateRow: {
    backgroundColor: 'rgb(249, 250, 251)',
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
  }
})


type Feature = {
  name: string
  hint?: string
  web: boolean
  iOS: boolean
  android: boolean
  windows: boolean
}

const features: Feature[] = [
  { name: 'Git Notebooks', web: true, iOS: true, android: true, windows: true },
  { name: 'GitHub Notebooks', web: true, iOS: true, android: true, windows: true },
  {
    name: 'Large Git/GitHub Notebooks',
    hint: 'Large notebooks are considered with a size of more than 5MB',
    web: false,
    iOS: true,
    android: true,
    windows: true
  },
  { name: 'File System Notebooks', web: true, iOS: false, android: false, windows: true },
  { name: 'iCloud Drive Notebooks', web: false, iOS: true, android: false, windows: false }
]

export default function FeatureComparison() {
  const classes = useStyles();

  return (
    <Section id='feature-comparison'>
      <SectionTitle>Feature Comparison</SectionTitle>

      <div className={ classes.tableWrap }>
        <table className={ classes.comparisonTable }>
          <thead>
            <tr>
              <th>Included Features</th>
              <th>Web</th>
              <th>iOS / macOS</th>
              <th>Android</th>
              <th>Windows</th>
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

function FeatureStatus(props: { status: boolean }) {
  const classes = useStyles();

  const Present = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3170e4" className={ classes.featureStatus } viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
  )

  const Absent = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#909296" className={ classes.featureStatus } viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>
  )

  return props.status ? Present : Absent
}

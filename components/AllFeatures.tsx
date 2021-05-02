import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  featuresContainer: {
    textAlign: 'center',
    margin: '50px 0'
  },
  featuresList: {
    columnCount: '2',
    columnGap: '50px',
    textAlign: 'start',
    listStyle: 'none',

    '@media only screen and (max-width: 800px)': {
      columnCount: '1'
    },

    '& li': {
      lineHeight: '200%',

      '&::before': {
        content: '"•"',
        color: 'var(--theme-color)',
        marginRight: '15px',
        fontWeight: 'bold'
      }
    }
  }
});

export default function AllFeatures() {
  const classes = useStyles();

  const features: string[] = [
    'GitHub notebook provider',
    'Local notebook provider (non syncable)',
    'Dark and light themes support',
    'Markdown preview with scroll sync',
    'Attach/upload image file on paste from clipboard',
    'Attach/upload image file from local disk/storage',
    'Convert html content to markdown on paste from clipboard',
    'Editor toolbar with all necessary commands (bold, italic, list, table, etc.)',
    'Markdown syntax guidance',
    'Automatic merge conflicts resolution',
    'Periodic background sync of data',
    'List item',
    'List item',
    'List item',
    'List item',
  ];

  return (
    <div className={classes.featuresContainer}>
      <h1>All Features</h1>

      <ul className={classes.featuresList}>
        { features.map((x, i) => (<li key={i}>{ x }.</li>)) }
      </ul>
    </div>
  )
}

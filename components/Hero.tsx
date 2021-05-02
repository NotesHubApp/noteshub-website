import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center'
  },
  /* Avoid Chrome to see Safari hack */
  '@supports (-webkit-touch-callout: none)': {
    heroContainer: {
      /* The hack for Safari */
      height: '-webkit-fill-available'
    }
  },
  title: {
    margin: '0',
    lineHeight: '1.15',
    fontSize: '4rem',
    textAlign: 'center'
  },
  titleAppName: {
    color: 'var(--theme-color)'
  },
  description: {
    lineHeight: '1.5',
    fontSize: '1.5rem',
    textAlign: 'center'
  },
  linksContainer: {
    textAlign: 'center',
    margin: '20px',

    '& a': {
      border: 'solid 1px gray',
      padding: '10px 20px',
      borderRadius: '100px 100px 100px 100px'
    }
  }
});

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={ classes.heroContainer }>
      <h1 className={classes.title}>
        Welcome to <span className={classes.titleAppName}>{process.env.NEXT_PUBLIC_APPNAME}</span>
      </h1>

      <p className={classes.description}>
        {process.env.NEXT_PUBLIC_APPDESC}
      </p>

      <div className={classes.linksContainer}>
        <a href={process.env.NEXT_PUBLIC_APPURL}><span>Web App</span></a>
      </div>
    </div>
  )
}

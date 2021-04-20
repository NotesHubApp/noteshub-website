import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center'
  },
  title: {
    margin: '0',
    lineHeight: '1.15',
    fontSize: '4rem',
    textAlign: 'center',

    '& a': {
      color: 'var(--theme-color)',
      textDecoration: 'none'
    },
    '& a:hover, a:focus, a:active': {
      textDecoration: 'underline'
    }
  },
  description: {
    lineHeight: '1.5',
    fontSize: '1.5rem',
    textAlign: 'center'
  }
});

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={ classes.heroContainer }>
      <h1 className={classes.title}>
        Welcome to <a href={process.env.NEXT_PUBLIC_APPURL}>{process.env.NEXT_PUBLIC_APPNAME}</a>
      </h1>

      <p className={classes.description}>
        {process.env.NEXT_PUBLIC_APPDESC}
      </p>
    </div>
  )
}

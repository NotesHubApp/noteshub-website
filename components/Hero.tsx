import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    margin: '0 30px'
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',

    '& a': {
      padding: '0 10px'
    },
    '& svg': {
    }
  },
  webAppLink: {
    border: 'solid 1px gray',
    padding: '10px 20px !important',
    borderRadius: '100px 100px 100px 100px',

    '&:hover': {
      color: 'white',
      borderColor: 'var(--theme-color)',
      background: 'var(--theme-color)'
    }
  },
  androidAppLink: {
    '&:hover svg': {
      fill: '#78C257'
    }
  },
  windowsAppLink: {
    '&:hover svg': {
      fill: '#01A6F0'
    }
  },
  appleAppLink: {
    '&:hover svg': {
      fill: '#A3AAAE'
    }
  }
});

export default function Hero() {
  const classes = useStyles();

  const showAppStoreInstruction = () => {
    alert('To install NotesHub on Apple device: use Web App, then open share dialog and select \'Add to Home Screen\'.');
  }

  return (
    <div className={ classes.heroContainer }>
      <h1 className={classes.title}>
        Welcome to <span className={classes.titleAppName}>{process.env.NEXT_PUBLIC_APPNAME}</span>
      </h1>

      <p className={classes.description}>
        {process.env.NEXT_PUBLIC_APPDESC}
      </p>

      <div className={classes.linksContainer}>
        <a
          className={ classes.webAppLink }
          href={process.env.NEXT_PUBLIC_APPURL}
        >
          <span>Web App</span>
        </a>

        <a
          className={ classes.androidAppLink }
          title="Android App"
          href={ process.env.NEXT_PUBLIC_GOOGLEPLAY_APPURL }
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="30" height="30" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z"/>
          </svg>
        </a>

        <a
          className={ classes.windowsAppLink }
          title="Windows App"
          href={ process.env.NEXT_PUBLIC_WINDOWSSTORE_APPURL }
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="30" height="30" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M746 1006v651l-682-94v-557h682zm0-743v659h-682v-565zm982 743v786l-907-125v-661h907zm0-878v794h-907v-669z"/>
          </svg>
        </a>

        <a
          className={ classes.appleAppLink }
          title="Apple App"
          href="javascript:void(0)"
          onClick={ showAppStoreInstruction }
        >
          <svg width="30" height="30" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1585 1215q-39 125-123 250-129 196-257 196-49 0-140-32-86-32-151-32-61 0-142 33-81 34-132 34-152 0-301-259-147-261-147-503 0-228 113-374 113-144 284-144 72 0 177 30 104 30 138 30 45 0 143-34 102-34 173-34 119 0 213 65 52 36 104 100-79 67-114 118-65 94-65 207 0 124 69 223t158 126zm-376-1173q0 61-29 136-30 75-93 138-54 54-108 72-37 11-104 17 3-149 78-257 74-107 250-148 1 3 2.5 11t2.5 11q0 4 .5 10t.5 10z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

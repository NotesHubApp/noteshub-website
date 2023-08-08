import {
  AndroidIcon,
  AppleIcon,
  ArrowCircleRightIcon,
  WebIcon,
  WindowsIcon
} from 'components/icons';

import { Announcement } from 'models/Announcement';
import { ExternalLink } from '../common/ExternalLink';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - var(--header-height))',
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
    '&:hover svg': {
      fill: 'var(--theme-color)',
    }
  },
  androidAppLink: {
    '& svg': {
      fill: 'currentColor'
    },
    '&:hover svg': {
      fill: '#78C257'
    }
  },
  windowsAppLink: {
    '& svg': {
      fill: 'currentColor'
    },
    '&:hover svg': {
      fill: '#01A6F0'
    }
  },
  appleAppLink: {
    '& svg': {
      fill: 'currentColor'
    },
    '&:hover svg': {
      fill: '#A3AAAE'
    }
  },
  announcementContainer: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    padding: '5px 7px',
    borderRadius: '9999px',
    borderColor: 'var(--divider-color)',
    borderStyle: 'solid',
    color: 'gray',
    margin: '20px',

    '& svg': {
      width: '14px',
      height: '14px'
    },

    '&:hover': {
      borderColor: 'gray'
    }
  },
  announcementIndicator: {
    borderRadius: '100%',
    backgroundColor: 'var(--theme-color)',
    width: '8px',
    height: '8px'
  },
  announcementText: {
    fontSize: '80%',
    maxWidth: '250px',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
});

type HeroProps = {
  announcement?: Announcement
}

export default function Hero({ announcement }: HeroProps) {
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
        <ExternalLink
          className={ classes.webAppLink }
          title="Web App"
          href={process.env.NEXT_PUBLIC_APPURL}
        >
          <WebIcon />
        </ExternalLink>

        <ExternalLink
          className={ classes.appleAppLink }
          title="Apple App"
          href={ process.env.NEXT_PUBLIC_APPSTORE_APPURL }
        >
          <AppleIcon />
        </ExternalLink>

        <ExternalLink
          className={ classes.androidAppLink }
          title="Android App"
          href={ process.env.NEXT_PUBLIC_GOOGLEPLAY_APPURL }
        >
          <AndroidIcon />
        </ExternalLink>

        <ExternalLink
          className={ classes.windowsAppLink }
          title="Windows App"
          href={ process.env.NEXT_PUBLIC_WINDOWSSTORE_APPURL }
        >
          <WindowsIcon />
        </ExternalLink>
      </div>

      {
        announcement && (
          <a className={ classes.announcementContainer } href={ announcement.url }>
            <div className={ classes.announcementIndicator } />
            <span className={ classes.announcementText }>{ announcement.title }</span>
            <ArrowCircleRightIcon />
          </a>
        )
      }
    </div>
  )
}

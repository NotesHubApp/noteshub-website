import {
  AndroidIcon,
  AppleIcon,
  LinuxIcon,
  WebIcon,
  WindowsIcon
} from 'components/icons';

import { Announcement } from 'models/Announcement';
import { AnnouncementBadge } from './AnnouncementBadge';
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
    textAlign: 'center',

    '@media (max-width: 500px)': {
      fontSize: '3.5rem'
    }
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
  linuxAppLink: {
    '& svg': {
      fill: 'currentColor'
    },
    '&:hover svg': {
      fill: 'gray'
    }
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

        <ExternalLink
          className={ classes.linuxAppLink }
          title="Linux App"
          href={ process.env.NEXT_PUBLIC_LINUX_APPURL }
        >
          <LinuxIcon />
        </ExternalLink>
      </div>

      <AnnouncementBadge announcement={ announcement } />
    </div>
  )
}

import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  RedditIcon,
  ShareIcon,
  TwitterIcon
} from 'components/icons';

import { PropsWithChildren } from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  shareList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.9em',

    '& button': {
      border: 'none',
      background: 'none',
      margin: 0,
      padding: 0,
      cursor: 'pointer'
    },

    '& svg': {
      width: '20px',
      height: '20px',
      opacity: 0.5,

      '&:hover': {
        opacity: 1
      }
    }
  },
  facebook: {
    '& :hover': {
      color: 'var(--facebook-color)'
    }
  },
  twitter: {
    '& :hover': {
      color: 'var(--twitter-color)'
    }
  },
  linkedin: {
    '& :hover': {
      color: 'var(--linkedin-color)'
    }
  },
  reddit: {
    '& :hover': {
      color: 'var(--reddit-color)'
    }
  }
})

type SharesheetProps = {
  url: string
  title: string
}

export function Sharesheet(props: SharesheetProps) {
  const classes = useStyles();

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          url: props.url,
          title: props.title
        })
      } catch {}
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(props.url);
      window.alert('Url has been copied to the clipboard.');
    }
  }

  return (
    <ul className={ classes.shareList }>
      <li className={ classes.facebook }>
        <ShareButton
          url="https://www.facebook.com/sharer/sharer.php"
          urlParams={{ u: props.url }}
        >
          <FacebookIcon />
        </ShareButton>
      </li>

      <li className={ classes.twitter }>
        <ShareButton
          url="https://twitter.com/share"
          urlParams={{ url: props.url, text: props.title }}
        >
          <TwitterIcon />
        </ShareButton>
      </li>

      <li className={ classes.linkedin }>
        <ShareButton
          url="https://linkedin.com/shareArticle"
          urlParams={{ url: props.url, mini: 'true', title: props.title }}
        >
          <LinkedInIcon />
        </ShareButton>
      </li>

      <li className={ classes.reddit }>
        <ShareButton
          url="https://www.reddit.com/submit"
          urlParams={{ url: props.url, title: props.title }}
        >
          <RedditIcon />
        </ShareButton>
      </li>

      <li>
        <a href={ `mailto:?subject=${encodeURIComponent(props.title)}&body=${encodeURIComponent(props.url)}` }>
          <EmailIcon />
        </a>
      </li>

      <li>
        <button onClick={ share }>
          <ShareIcon />
        </button>
      </li>
    </ul>
  )
}

type ShareButtonProps = {
  url: string
  urlParams: {[key: string]: string}
  width?: number
  height?: number
}

function ShareButton(props: PropsWithChildren<ShareButtonProps>) {
  const onClick = () => {
    const w = props.width ?? 550;
    const h = props.height ?? 400;

    const windowFeaturesObj = {
      width: w,
      height: h,
      esizable: 'no',
      centerScreen: 'yes',
      location: "no",
      toolbar: 'no',
      status: 'no',
      directories: 'no',
      menubar: 'no',
      scrollbars: 'yes',
      left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - w / 2,
      top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - h / 2
    }

    const windowFeatures = Object.entries(windowFeaturesObj).map(([p, d]) => `${p}=${d}`).join(", ");
    const urlParams = Object.entries(props.urlParams)
      .filter(([key, value]) => value != null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
    const url = `${props.url}?${urlParams}`;
    window.open(url, '', windowFeatures);
  }

  return (
    <button onClick={ onClick }>
      { props.children }
    </button>
  )
}

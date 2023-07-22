import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
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
    gap: '0.7em',

    '& button': {
      border: 'none',
      background: 'none',
      margin: 0,
      padding: 0,
      cursor: 'pointer'
    }
  }
})

type SharesheetProps = {
  url: string
  title: string
}

export function Sharesheet(props: SharesheetProps) {
  const classes = useStyles();

  const onClick = () => {
    window.open()
  }

  return (
    <ul className={ classes.shareList }>
      <li>
        <ShareButton
          url="https://www.facebook.com/sharer/sharer.php"
          urlParams={{ u: props.url }}
        >
          <FacebookIcon />
        </ShareButton>
      </li>

      <li>
        <ShareButton
          url="https://twitter.com/share"
          urlParams={{ url: props.url, text: props.title }}
        >
          <TwitterIcon />
        </ShareButton>
      </li>

      <li>
        <ShareButton
          url="https://www.reddit.com/submit"
          urlParams={{ url: props.url, title: props.title }}
        >
          <RedditIcon />
        </ShareButton>
      </li>

      {/* <li>
        <ShareButton>
          <EmailIcon />
        </ShareButton>
      </li> */}
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

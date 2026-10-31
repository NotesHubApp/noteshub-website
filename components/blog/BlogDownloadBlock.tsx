import {
  AndroidIcon,
  AppleIcon,
  LinuxIcon,
  WebIcon,
  WindowsIcon
} from 'components/icons';
import { DownloadStore, downloadTap } from 'utils/downloadTap';

import { ExternalLink } from 'components/common/ExternalLink';
import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    marginTop: '30px',
    padding: '25px 20px',
    borderRadius: '10px',
    border: '1px solid var(--divider-color)',
    background: 'var(--alternative-raw-color)',
    textAlign: 'center'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '1.5rem'
  },
  appName: {
    color: 'var(--theme-color)'
  },
  description: {
    margin: '0 0 20px 0',
    lineHeight: '1.5'
  },
  links: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1px solid var(--divider-color)',
    background: 'var(--background-paper)',
    color: 'var(--text-primary)',
    fill: 'currentColor',
    textDecoration: 'none',
    fontWeight: 500,

    '& svg': {
      width: '22px',
      height: '22px',
      fill: 'currentColor'
    },

    '&:hover': {
      borderColor: 'var(--theme-color)',
      color: 'var(--theme-color)'
    }
  }
});

type DownloadOption = {
  store: DownloadStore
  label: string
  href?: string
  icon: ReactNode
}

const downloadOptions: DownloadOption[] = [
  { store: 'web', label: 'Web', href: process.env.NEXT_PUBLIC_APPURL, icon: <WebIcon /> },
  { store: 'app-store', label: 'iOS & macOS', href: process.env.NEXT_PUBLIC_APPSTORE_APPURL, icon: <AppleIcon /> },
  { store: 'google-play', label: 'Android', href: process.env.NEXT_PUBLIC_GOOGLEPLAY_APPURL, icon: <AndroidIcon /> },
  { store: 'windows', label: 'Windows', href: process.env.NEXT_PUBLIC_WINDOWSSTORE_APPURL, icon: <WindowsIcon /> },
  { store: 'linux', label: 'Linux', href: process.env.NEXT_PUBLIC_LINUX_APPURL, icon: <LinuxIcon /> }
];

// Shown at the end of every blog post, so a reader who got here from search has a
// next step. Taps are counted with placement "blog", apart from the home page ones.
export function BlogDownloadBlock() {
  const classes = useStyles();

  return (
    <aside className={ classes.container } aria-label={ `Get ${process.env.NEXT_PUBLIC_APPNAME}` }>
      <h2 className={ classes.title }>
        Try <span className={ classes.appName }>{ process.env.NEXT_PUBLIC_APPNAME }</span>
      </h2>
      <p className={ classes.description }>
        { process.env.NEXT_PUBLIC_APPDESC }.
      </p>
      <ul className={ classes.links }>
        { downloadOptions.map(option => (
          <li key={ option.store }>
            <ExternalLink
              className={ classes.link }
              href={ option.href }
              title={ `${process.env.NEXT_PUBLIC_APPNAME} for ${option.label}` }
              { ...downloadTap(option.store, 'blog') }
            >
              { option.icon }
              { option.label }
            </ExternalLink>
          </li>
        )) }
      </ul>
    </aside>
  );
}

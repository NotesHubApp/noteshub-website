import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  RedditIcon,
  RssIcon,
  XIcon
} from './icons'
import { PropsWithChildren, useEffect } from 'react'

import { DiscountLabel } from './common/DiscountLabel'
import Head from 'next/head'
import Link from 'next/link'
import { ThemeSwitcher } from './common/ThemeSwitcher'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  pageContainer: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    width: '100%',
    height: 'var(--header-height)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'saturate(180%) blur(5px)',
    borderBottom: '1px solid var(--divider-color)',
    background: 'var(--header-bg)',
    color: 'gray',
    gap: '20px',
    zIndex: 200,
  },
  navList: {
    margin: 0,
    padding: 0,
    display: 'flex',
    listStyle: 'none',
    gap: '20px',

    '& .active': {
      color: 'var(--theme-color)'
    },

    '& li': {
      opacity: 0.8,
      fontWeight: 500
    },
    '& li:hover': {
      opacity: 1
    },
  },
  main: {
    width: '100%',
    flexGrow: 1
  },
  footer: {
    padding: '10px',
    width: '100%',
    borderTop: '1px solid var(--divider-color)',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    '& a': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  copyrightText: {
    color: '#787878'
  },
  socialList: {
    listStyle: 'none',
    paddingLeft: '0',
    '& li': {
      padding: '0',
      display: 'inline-block',

      '& a': {
        margin: '0 8px'
      },
      '& svg': {
        width: '23px',
        height: '23px',

        '&:hover': {
          filter: 'brightness(60%)'
        }
      }
    }
  }
});


type LayoutProps = {
  pageId: string
  pageTitle: string
  mediaTitle?: string
  description?: string
  imageUrl?: string
  className?: string
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  const classes = useStyles();
  const pageDescription = props.description || process.env.NEXT_PUBLIC_APPDESC;

  useEffect(() => {
    selectMenuItem('#main-menu', props.pageId, 'active');
  }, []);

  const selectMenuItem = (menuSelector: string, munuItem: string, selectClass: string) => {
    const menu = document.querySelector(menuSelector);

    if (menu && munuItem) {
      const item = menu.querySelector(`[data-menu-item-id~="${munuItem}"]`);

      if (item != null) {
        item.classList.add(selectClass);
      }
    }
  }

  return (
    <div className={ classes.pageContainer }>
      <Head>
        <title>{ props.pageTitle }</title>
        <meta name="description" content={ pageDescription } />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={ props.mediaTitle || process.env.NEXT_PUBLIC_APPSLOGAN } />
        <meta property="og:description" content={ pageDescription } />
        { props.imageUrl && <meta property="og:image" content={ props.imageUrl } /> }

        {/* Twitter */}
        <meta property="twitter:card" content={ props.imageUrl ? 'summary_large_image' : 'summary' } />
        <meta property="twitter:title" content={ props.mediaTitle || process.env.NEXT_PUBLIC_APPSLOGAN } />
        <meta property="twitter:description" content={ pageDescription } />
        { props.imageUrl && <meta property="twitter:image" content={ props.imageUrl } /> }

        <meta name="apple-itunes-app" content={ `app-id=${process.env.NEXT_PUBLIC_APPSTORE_APPID}` }></meta>

        <link rel="alternate" type="application/rss+xml" title={`${process.env.NEXT_PUBLIC_APPNAME}'s blog feed`} href="/feed.xml"
/>
      </Head>

      <header className={ classes.header }>
        <nav id="main-menu">
          <ul className={ classes.navList }>
            <li data-menu-item-id="home">
              <Link href="/">Home</Link>
            </li>
            <li data-menu-item-id="blog">
              <Link href="/blog">Blog</Link>
            </li>
            <li data-menu-item-id="about">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>

      <DiscountLabel value={ 25 } />

      <main className={ clsx(classes.main, props.className) }>
        { props.children }
      </main>

      <Footer />
    </div>
  )
}


type SocialLinkProps = {
  href?: string
  title: string
  color: string
}

function SocialLink(props: React.PropsWithChildren<SocialLinkProps>) {
  return (
    <li>
      <a
        href={ props.href }
        title={ props.title }
        style={{ color: props.color }}
        target="_blank"
        rel="noopener noreferrer"
      >
        { props.children }
      </a>
    </li>
  )
}

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.copyrightText}>
        <p>&copy; { new Date().getFullYear() } {process.env.NEXT_PUBLIC_COMPANYNAME} All rights reserved.</p>
      </div>
      <ul className={ classes.socialList } id="contacts">
        <SocialLink title="Facebook page" href={ process.env.NEXT_PUBLIC_FACEBOOK_LINK } color="var(--facebook-color)">
          <FacebookIcon />
        </SocialLink>

        <SocialLink title="Twitter page" href={ process.env.NEXT_PUBLIC_TWITTER_LINK } color="currentColor">
          <XIcon />
        </SocialLink>

        <SocialLink title="Instagram page" href={ process.env.NEXT_PUBLIC_INSTAGRAM_LINK } color="var(--instagram-color)">
          <InstagramIcon />
        </SocialLink>

        <SocialLink title="Reddit" href={ process.env.NEXT_PUBLIC_REDDIT_LINK } color="var(--reddit-color)">
          <RedditIcon />
        </SocialLink>

        <SocialLink title="LinkedIn" href={ process.env.NEXT_PUBLIC_LINKEDIN_LINK } color="var(--linkedin-color)">
          <LinkedInIcon />
        </SocialLink>

        <SocialLink title="Contact/support" href={ `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` } color="currentColor">
          <EmailIcon />
        </SocialLink>

        <SocialLink title="Blog feed" href="/feed.xml" color="currentColor">
          <RssIcon />
        </SocialLink>
      </ul>

      <ThemeSwitcher />
    </footer>
  )
}

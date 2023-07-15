import { PropsWithChildren, useEffect } from 'react'

import Footer from './Footer'
import Head from 'next/head'
import Link from 'next/link'
import { ThemeSwitcher } from './common/ThemeSwitcher'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  pageContainer: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
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

    '& .active': {
      color: 'var(--theme-color)'
    }
  }
});


type LayoutProps = {
  pageId: string;
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  const classes = useStyles();

  useEffect(() => {
    selectMenuItem('nav', props.pageId, 'active');
  }, []);

  const selectMenuItem = (menuSelector: string, munuItem: string, selectClass: string) => {
    const menu = document.querySelector(menuSelector);

    if (menu && munuItem) {
      const item = menu.querySelector(`a[data-menu-item-id~="${munuItem}"]`);

      if (item != null) {
        item.classList.add(selectClass);
      }
    }
  }

  return (
    <div className={ classes.pageContainer }>
      <Head>
        <title>{ `${process.env.NEXT_PUBLIC_APPNAME} - ${process.env.NEXT_PUBLIC_APPTITLE}` }</title>
        <meta name="description" content={ process.env.NEXT_PUBLIC_APPDESC } />

        {/* Open Graph / Facebook */}
        <meta property="og:url" content={process.env.NEXT_PUBLIC_LANDING_PAGE_URL} />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_APPSLOGAN} />
        <meta property="og:description" content={ process.env.NEXT_PUBLIC_APPDESC } />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_LANDING_PAGE_URL}/images/promo-banner.webp`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_LANDING_PAGE_URL} />
        <meta property="twitter:title" content={process.env.NEXT_PUBLIC_APPSLOGAN} />
        <meta property="twitter:description" content={ process.env.NEXT_PUBLIC_APPDESC } />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_LANDING_PAGE_URL}/images/promo-banner.webp`} />

        <meta name="apple-itunes-app" content={ `app-id=${process.env.NEXT_PUBLIC_APPSTORE_APPID}` }></meta>
      </Head>

      <nav className={ classes.nav }>
        <Link href="/" data-menu-item-id="home">Home</Link>
        <Link href="/blog" data-menu-item-id="blog">Blog</Link>
        <a>About</a>
      </nav>

      { props.children }

      <ThemeSwitcher />
      <Footer />
    </div>
  )
}

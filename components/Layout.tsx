import { PropsWithChildren, useEffect } from 'react'

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
        margin: '0 10px'
      },
      '& svg': {
        width: '25px',
        height: '25px',

        '&:hover': {
          filter: 'brightness(60%)'
        }
      }
    }
  }
});


type LayoutProps = {
  pageId: string
  className?: string
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  const classes = useStyles();

  useEffect(() => {
    selectMenuItem('#main-menu', props.pageId, 'active');
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

      <nav id="main-menu" className={ classes.nav }>
        <Link href="/" data-menu-item-id="home">Home</Link>
        <Link href="/blog" data-menu-item-id="blog">Blog</Link>
        <a>About</a>
      </nav>

      <main className={ clsx(classes.main, props.className) }>
        { props.children }
      </main>

      <ThemeSwitcher />
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
        <SocialLink title="Facebook page" href={ process.env.NEXT_PUBLIC_FACEBOOK_LINK } color="#4267B2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
          </svg>
        </SocialLink>

        <SocialLink title="Twitter page" href={ process.env.NEXT_PUBLIC_TWITTER_LINK } color="#1DA1F2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
          </svg>
        </SocialLink>

        <SocialLink title="Instagram page" href={ process.env.NEXT_PUBLIC_INSTAGRAM_LINK } color="#C13584">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
        </SocialLink>

        <SocialLink title="Reddit" href={ process.env.NEXT_PUBLIC_REDDIT_LINK } color="#FF4500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.167 8a.831.831 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661zm1.843 3.647c.315 0 1.403-.038 1.976-.611a.232.232 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z"/>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.203.203 0 0 0-.153.028.186.186 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256 2.577 0 4.668-1.451 4.668-3.256 0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z"/>
          </svg>
        </SocialLink>

        <SocialLink title="LinkedIn" href={ process.env.NEXT_PUBLIC_LINKEDIN_LINK } color="#0A66C2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg>
        </SocialLink>

        <SocialLink title="Contact/support" href={ `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` } color="currentColor">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </SocialLink>
      </ul>
    </footer>
  )
}

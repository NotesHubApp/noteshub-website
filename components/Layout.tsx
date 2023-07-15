import Footer from './Footer'
import Head from 'next/head'
import Header from './Header'
import { PropsWithChildren } from 'react'
import { ThemeSwitcher } from './common/ThemeSwitcher'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  pageContainer: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  }
});


type LayoutProps = {

}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  const classes = useStyles();

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

      <Header />

      { props.children }

      <ThemeSwitcher />
      <Footer />
    </div>
  )
}

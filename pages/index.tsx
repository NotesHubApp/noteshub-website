import React from 'react'
import Head from 'next/head'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import { createUseStyles } from 'react-jss'
import Footer from '../components/Footer'
import AllFeatures from '../components/AllFeatures'
import Donation from '../components/Donation'
import FeatureComparison from '../components/FeatureComparison'
import Faq from '../components/FAQ'

const useStyles = createUseStyles({
  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    width: '100%',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
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

      <main className={classes.main}>
        <Hero />
        <Highlights />
        <AllFeatures />
        <FeatureComparison />
        <Faq />
        <Donation />
      </main>

      <Footer />
    </div>
  )
}

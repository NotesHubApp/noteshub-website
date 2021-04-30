import React from 'react'
import Head from 'next/head'
import ScrollToTop from '../components/common/ScrollToTop'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {
    minHeight: '100%',
    padding: '0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    width: '100%',
    padding: '2rem 0',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: '100%',
    height: '100px',
    borderTop: '1px solid #eaeaea',
    display: 'flex',
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
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Head>
        <title>{ `${process.env.NEXT_PUBLIC_APPNAME} - ${process.env.NEXT_PUBLIC_APPTITLE}` }</title>
      </Head>

      <main className={classes.main}>
        <Hero />
        <Highlights />
      </main>

      <footer className={classes.footer}>
        <div className={classes.copyrightText}>
          <p>&copy; { new Date().getFullYear() } {process.env.NEXT_PUBLIC_COMPANYNAME} All rights reserved.</p>
        </div>

        <ScrollToTop />
      </footer>
    </div>
  )
}

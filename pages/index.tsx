import React from 'react'
import Head from 'next/head'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import { createUseStyles } from 'react-jss'
import Footer from '../components/Footer'

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

      <Footer />
    </div>
  )
}

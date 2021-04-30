import Head from 'next/head'
import React from 'react'
import ScrollToTop from '../components/common/ScrollToTop'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ `${process.env.NEXT_PUBLIC_APPNAME} - ${process.env.NEXT_PUBLIC_APPTITLE}` }</title>
      </Head>

      <main className={styles.main}>
        <Hero />
        <Highlights />
      </main>

      <footer className={styles.footer}>
        <div className={styles['copyright-text']}>
          <p>&copy; { new Date().getFullYear() } {process.env.NEXT_PUBLIC_COMPANYNAME} All rights reserved.</p>
        </div>

        <ScrollToTop />
      </footer>
    </div>
  )
}

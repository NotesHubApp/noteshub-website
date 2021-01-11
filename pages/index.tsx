import Head from 'next/head'
import ScrollToTop from '../components/common/ScrollToTop'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ `${process.env.NEXT_PUBLIC_APPNAME} - ${process.env.NEXT_PUBLIC_APPTITLE}` }</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href={process.env.NEXT_PUBLIC_APPURL}>{process.env.NEXT_PUBLIC_APPNAME}</a>
        </h1>

        <p className={styles.description}>
          {process.env.NEXT_PUBLIC_APPDESC}
        </p>
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

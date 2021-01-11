import Head from 'next/head'
import ScrollToTop from '../components/common/ScrollToTop'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ `${process.env.NEXT_PUBLIC_APPNAME} - ${process.env.NEXT_PUBLIC_APPTITLE}` }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.noteshub.app">{ process.env.NEXT_PUBLIC_APPNAME }!</a>
        </h1>

        <p className={styles.description}>
          Fully cross-platform, vendor-agnostic, markdown based note-taking app
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>

        <ScrollToTop />
      </footer>
    </div>
  )
}

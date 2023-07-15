import AllFeatures from '../components/home/AllFeatures'
import Donation from '../components/home/Donation'
import Faq from '../components/home/FAQ'
import FeatureComparison from '../components/home/FeatureComparison'
import Hero from '../components/home/Hero'
import Highlights from '../components/home/Highlights'
import { Layout } from 'components/Layout'
import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  main: {
    width: '100%',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <Layout pageId="home">
      <main className={classes.main}>
        <Hero />
        <Highlights />
        <AllFeatures />
        <FeatureComparison />
        <Faq />
        <Donation />
      </main>
    </Layout>
  )
}

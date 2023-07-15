import AllFeatures from '../components/AllFeatures'
import Donation from '../components/Donation'
import Faq from '../components/FAQ'
import FeatureComparison from '../components/FeatureComparison'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
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
    <Layout>
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

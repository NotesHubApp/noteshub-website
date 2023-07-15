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
  home: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <Layout pageId="home" className={ classes.home }>
      <Hero />
      <Highlights />
      <AllFeatures />
      <FeatureComparison />
      <Faq />
      <Donation />
    </Layout>
  )
}

import AllFeatures from '../components/home/AllFeatures'
import { Announcement } from 'models/Announcement'
import Donation from '../components/home/Donation'
import Faq from '../components/home/FAQ'
import FeatureComparison from '../components/home/FeatureComparison'
import Hero from '../components/home/Hero'
import Highlights from '../components/home/Highlights'
import { Layout } from 'components/Layout'
import React from 'react'
import { Routes } from 'utils/Routes'
import Testimonials from 'components/home/Testimonials'
import { blogRepository } from 'data/blogConfig'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  home: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export async function getStaticProps() {
  const latestPost = blogRepository.getLatestPublishedPost();

  const postAnnouncement: Announcement | undefined = latestPost ? {
    type: 'post',
    title: latestPost.title,
    url: Routes.blogPost(latestPost)
  } : undefined

  const productHuntAnnouncement: Announcement = {
    type: 'productHunt',
    postId: '378905',
    postSlug: 'noteshub-2-x'
  }

  return { props: { announcement: postAnnouncement } }
}

type HomeProps = {
  announcement?: Announcement
}

export default function Home(props: HomeProps) {
  const classes = useStyles();

  return (
    <Layout
      pageId="home"
      pageTitle={ `${process.env.NEXT_PUBLIC_APPNAME} - ${process.env.NEXT_PUBLIC_APPTITLE}` }
      imageUrl={ `${process.env.NEXT_PUBLIC_LANDING_PAGE_URL}/images/promo-banner.webp` }
      className={ classes.home }
    >
      <Hero announcement={ props.announcement } />
      <Highlights />
      <AllFeatures />
      <FeatureComparison />
      <Testimonials />
      <Faq />
      <Donation />
    </Layout>
  )
}

import * as env from 'utils/env';

import { BlogPost } from 'models/BlogPost'
import { BlogDownloadBlock } from 'components/blog/BlogDownloadBlock';
import BlogPostContent from 'components/blog/BlogPostContent';
import { BlogPostInfo } from 'components/blog/BlogPostInfo';
import Head from 'next/head';
import { Layout } from 'components/Layout'
import { Routes } from 'utils/Routes';
import { Sharesheet } from 'components/common/Sharesheet';
import { blogRepository } from 'data/blogConfig';
import { createUseStyles } from 'react-jss';
import { dateToIsoString } from 'utils/dateUtils';

const useStyles = createUseStyles({
  container: {
    maxWidth: 'var(--max-content-width)',
    padding: '15px 15px',
    margin: '0 auto'
  },
  postTitle: {
    textAlign: 'center',
    fontSize: 'var(--heading1-size)'
  },
  heroImage: {
    maxWidth: '100%',
    borderRadius: '10px',
    marginTop: '15px'
  },
  postFooter: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }
});


type PageParams = {
  year: number
  month: number
  slug: string
}

export async function getStaticPaths() {
  const allPosts = blogRepository.getAllPostAnnotations();
  return {
    paths: allPosts.map(post => {
      const postedOnDate = new Date(post.postedOn);
      return {
        params: {
          year: postedOnDate.getFullYear().toString(),
          month: (postedOnDate.getMonth() + 1).toString(),
          slug: post.urlSlug
        }
      };
    }),
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: PageParams }) {
  const post = blogRepository.getPost(params.year, params.month, params.slug);
  return { props: post };
}

export default function BlogPostPage(props: BlogPost) {
  const classes = useStyles();
  const canonicalUrl = props.canonicalUrl ?? Routes.blogPost(props, true);
  const publishedTime = dateToIsoString(new Date(props.postedOn));
  const modifiedTime = props.modified ? dateToIsoString(new Date(props.modified)) : publishedTime;
  const structuredData = getStructuredData(props, canonicalUrl, publishedTime, modifiedTime);

  return (
    <Layout
      pageId="blog"
      pageTitle={ `${props.title} - Blog` }
      canonicalUrl={ canonicalUrl }
      mediaTitle={ props.title }
      description={ props.description }
      imageUrl={ getImageUrl(props.image) }
      article={{ publishedTime, modifiedTime }}
    >
      <Head>
        {/* "<" is escaped so that text from a post can't close the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </Head>

      <div className={ classes.container }>
        <article>
          <h1 className={ classes.postTitle }>{props.title}</h1>
          <img className={ classes.heroImage } src={ `${props.image}` } alt={ props.title } />
          <BlogPostContent urlSlug={props.urlSlug} markdownContent={props.content} />
        </article>

        <BlogDownloadBlock />

        <div className={ classes.postFooter }>
          <BlogPostInfo post={ props } />
          <Sharesheet
            url={ Routes.blogPost(props, true) }
            title={ props.title }
            twitterHandle={ process.env.NEXT_PUBLIC_TWITTER_HANDLE }
          />
        </div>
      </div>
    </Layout>
  )
}

function getImageUrl(image?: string) {
  if (!image) {
    return undefined;
  }

  if (/^http(s)?:/i.test(image)) {
    return image;
  }

  return new URL(image, env.baseUrl).href;
}

function getStructuredData(post: BlogPost, canonicalUrl: string, publishedTime: string, modifiedTime: string) {
  const organization = {
    '@type': 'Organization',
    name: process.env.NEXT_PUBLIC_APPNAME,
    url: env.baseUrl,
    logo: `${env.baseUrl}/images/app/icon-512.png`
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: canonicalUrl,
    headline: post.title,
    description: post.description,
    image: getImageUrl(post.image),
    datePublished: publishedTime,
    dateModified: modifiedTime,
    articleSection: post.category.name,
    author: organization,
    publisher: organization
  };
}

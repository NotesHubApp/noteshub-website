import * as env from 'utils/env';

import { BlogPost } from 'models/BlogPost'
import BlogPostContent from 'components/blog/BlogPostContent';
import { BlogPostInfo } from 'components/blog/BlogPostInfo';
import { Layout } from 'components/Layout'
import { Routes } from 'utils/Routes';
import { Sharesheet } from 'components/common/Sharesheet';
import { blogRepository } from 'data/blogConfig';
import { createUseStyles } from 'react-jss';

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

  return (
    <Layout
      pageId="blog"
      pageTitle={ `${props.title} - Blog` }
      mediaTitle={ props.title }
      description={ props.description }
      imageUrl={ getImageUrl(props.image) }
    >
      <div className={ classes.container } itemScope itemType="http://schema.org/BlogPosting">
        <article>
          <h1 className={ classes.postTitle } itemProp="name">{props.title}</h1>
          <img className={ classes.heroImage } src={ `${props.image}` } alt="Hero image" />
          <BlogPostContent urlSlug={props.urlSlug} markdownContent={props.content} />
        </article>

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

import { BlogPost } from 'models/BlogPost'
import BlogPostContent from 'components/blog/BlogPostContent';
import { Layout } from 'components/Layout'
import { Routes } from 'utils/Routes';
import { Sharesheet } from 'components/common/Sharesheet';
import { TimeIcon } from 'components/icons';
import { blogRepository } from 'data/blogConfig';
import { createUseStyles } from 'react-jss';
import { dateToString } from 'utils/dateUtils';

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
  postInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  heroImage: {
    maxWidth: '100%',
    borderRadius: '5px',
    marginTop: '15px'
  }
});


type PageParams = {
  year: number
  month: number
  slug: string
}

export async function getStaticPaths() {
  const allPosts = blogRepository.getAllPublishedPosts();
  return {
    paths: allPosts.map(post => {
      const postedOnDate = new Date(post.postedOn);
      return {
        params: {
          year: postedOnDate.getFullYear().toString(),
          month: postedOnDate.getMonth().toString(),
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
        <h1 className={ classes.postTitle } itemProp="name">{props.title}</h1>
        <p className={ classes.postInfo }>
          { props.published ? <TimeIcon /> : <></> }
          <span itemProp="datePublished">{ dateToString(new Date(props.postedOn)) }</span>
        </p>

        <section id="content" itemProp="blogPost" className="blog-post-content">
          <img className={ classes.heroImage } src={ `${props.image}` } />

          <BlogPostContent urlSlug={props.urlSlug} markdownContent={props.content} />
        </section>

        <h2>Share article</h2>
        <Sharesheet
          url={ Routes.blogPost(props, true) }
          title={ props.title }
          twitterHandle={ process.env.NEXT_PUBLIC_TWITTER_HANDLE }
        />
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

  return new URL(
    image.startsWith('/') ? `/posts${image}` : `/posts/${image}`,
    process.env.NEXT_PUBLIC_LANDING_PAGE_URL
  ).href;
}

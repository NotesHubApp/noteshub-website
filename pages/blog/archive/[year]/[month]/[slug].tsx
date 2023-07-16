import { BlogPost } from 'models/BlogPost'
import BlogPostContent from 'components/blog/BlogPostContent';
import { BlogRepository } from 'repositories/BlogRepository';
import { Layout } from 'components/Layout'
import { dateToString } from 'utils/dateUtils';

type PageParams = {
  year: number
  month: number
  slug: string
}

const blogRepository = new BlogRepository();

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
  return (
    <Layout
      pageId="blog"
      pageTitle={ `${props.title} - Blog` }
      mediaTitle={ props.title }
      description={ props.description }
      imageUrl={ getImageUrl(props.image) }
    >
      <div className="jumbotron page-header">
        <div className="container">
          <h1 itemProp="name">{props.title}</h1>
          <p>
            <i className={ props.published ? " fa fa-clock-o" : "glyphicon glyphicon-hourglass"}></i>&nbsp;
            <span itemProp="datePublished">{ dateToString(new Date(props.postedOn)) }</span>
          </p>
        </div>
      </div>

      <div className="container" itemScope itemType="http://schema.org/BlogPosting">
        <section id="content" itemProp="blogPost" className="blog-post-content">
          <BlogPostContent urlSlug={props.urlSlug} markdownContent={props.content} />
        </section>
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

import { BlogPostAnnotation } from 'models/BlogPost';
import BlogPostsList from 'components/blog/BlogPostsList';
import { Layout } from 'components/Layout';
import { blogRepository } from 'data/blogConfig';

type BlogProps = {
  posts: BlogPostAnnotation[]
}

export async function getStaticProps() {
  const posts = blogRepository.getAllPublishedPosts();
  return { props: { posts } };
}

export default function BlogPage(props: BlogProps) {
  return (
    <Layout
      pageId="blog"
      pageTitle="Blog"
    >
      <BlogPostsList subtitle="Latest posts" posts={ props.posts } />
    </Layout>
  )
}

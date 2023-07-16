import { BlogPostAnnotation } from 'models/BlogPost';
import BlogPostsList from 'components/blog/BlogPostsList';
import { BlogRepository } from 'repositories/BlogRepository';
import { Layout } from 'components/Layout';

type BlogProps = {
  posts: BlogPostAnnotation[]
}

export async function getStaticProps() {
  const blogRepository = new BlogRepository();
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

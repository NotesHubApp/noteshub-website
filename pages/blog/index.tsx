import { BlogPostAnnotation } from 'models/BlogPost';
import BlogPostsList from 'components/blog/BlogPostsList';
import { Layout } from 'components/Layout';
import { blogRepository } from 'data/blogConfig';
import fs from 'fs';

type BlogProps = {
  posts: BlogPostAnnotation[]
}

export async function getStaticProps() {
  const feed = blogRepository.generateFeed();
  fs.writeFileSync('./public/feed.xml', feed);

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

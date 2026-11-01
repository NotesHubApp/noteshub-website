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

  const sitemap = blogRepository.generateSitemap();
  fs.writeFileSync('./public/sitemap.xml', sitemap);

  blogRepository.copyAssets();
  await blogRepository.generateSocialImages();

  const posts = blogRepository.getAllPublishedPostAnnotations();
  return { props: { posts } };
}

export default function BlogPage(props: BlogProps) {
  return (
    <Layout
      pageId="blog"
      pageTitle="Blog"
      canonicalUrl="/blog"
    >
      <BlogPostsList subtitle="Latest Posts" posts={ props.posts } />
    </Layout>
  )
}

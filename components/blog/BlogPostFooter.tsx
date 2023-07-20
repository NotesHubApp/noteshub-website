import { BlogPostAnnotation } from 'models/BlogPost'
import Link from 'next/link'

export default function BlogPostFooter({ post }: { post: BlogPostAnnotation }) {
  return (
    <div className="blog-post-footer">
      {/* Category */}
      <div className="post-category">
        <span>Posted in </span>
        <Link
          href="/blog/category/[slug]"
          as={`/blog/category/${post.category.urlSlug}`}
          title={`See all posts in ${post.category.name}`}
        >
          {post.category.name}
        </Link>
      </div>
    </div>
  );
}

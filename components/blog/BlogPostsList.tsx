import { BlogPostAnnotation } from 'models/BlogPost';
import BlogPostContent from './BlogPostContent';
import Link from 'next/link';
import { dateToString } from 'utils/dateUtils';

type BlogPostsListProps = {
  subtitle: string;
  posts: BlogPostAnnotation[]
}

export default function BlogPostsList(props: BlogPostsListProps) {
  // const keywords = props.posts
  //   .map(x => x.tags)
  //   .reduce((a, b) => a.concat(b), [])
  //   .map(y => y.name)
  //   .filter((value, index, self) => self.indexOf(value) === index)
  //   .concat([ appConfig.brandName ]);

  return (
    <div className="container">
      <section id="content">
        <div className="result">
          <span>{ `1 - ${props.posts.length} of ${props.posts.length} posts` }</span>
        </div>

        <ul className="reset list">
          { props.posts.map(post => <li key={ post.urlSlug }><PostDescription post={ post } /></li>) }
        </ul>
      </section>
    </div>
  )
}

function PostDescription(props: { post: BlogPostAnnotation }) {
  return (
    <div className="post-template">
      <h1 className="post-title">
        <Link
          title={ props.post.title }
          href="/blog/archive/[year]/[month]/[slug]"
          as={`/blog/archive/${new Date(props.post.postedOn).getFullYear()}/${new Date(props.post.postedOn).getMonth()}/${props.post.urlSlug}`}>
          { props.post.title }
        </Link>
      </h1>

      {/* Posted date */}
      <div className="post-date">
        <i className="fa fa-clock-o"></i> { dateToString(new Date(props.post.postedOn)) }
      </div>

      <div className="post-desc blog-post-content">
        <BlogPostContent urlSlug={props.post.urlSlug} markdownContent={props.post.annotation} />
      </div>

      <hr className="blog-post-footer-delimiter" />

      {/* <BlogPostFooter post={props.post} /> */}
    </div>
  );
}

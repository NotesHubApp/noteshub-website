import { Badge } from 'components/common/Badge';
import { BlogPostAnnotation } from 'models/BlogPost';
import BlogPostContent from './BlogPostContent';
import Link from 'next/link';
import { TimeIcon } from 'components/icons';
import { createUseStyles } from 'react-jss';
import { dateToString } from 'utils/dateUtils';

const useStyles = createUseStyles({
  container: {
    maxWidth: 'var(--max-content-width)',
    padding: '15px 15px',
    margin: '0 auto'
  },
  postsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  postTitle: {
    color: 'var(--theme-color)',
    fontWeight: 'bold',
    fontSize: '2em',
    marginBottom: '10px',

    '& a:hover': {
      textDecoration: 'underline'
    }
  },
  postDate: {
    display: 'flex',
    gap: '5px',
    color: '#7f919e',
    fill: '#7f919e',
    '& svg': {
      width: '1em'
    }
  },
  blogPostFooterDelimiter: {
    height: '1px',
    backgroundColor: 'var(--divider-color)',
    border: 'none'
  }
})


type BlogPostsListProps = {
  subtitle: string;
  posts: BlogPostAnnotation[]
}

export default function BlogPostsList(props: BlogPostsListProps) {
  const classes = useStyles();

  // const keywords = props.posts
  //   .map(x => x.tags)
  //   .reduce((a, b) => a.concat(b), [])
  //   .map(y => y.name)
  //   .filter((value, index, self) => self.indexOf(value) === index)
  //   .concat([ appConfig.brandName ]);

  return (
    <div className={ classes.container }>
      <section id="content">
        <div>
          <Badge>
            { `1 - ${props.posts.length} of ${props.posts.length} posts` }
          </Badge>
        </div>

        <ul className={ classes.postsList }>
          { props.posts.map(post => <li key={ post.urlSlug }><PostDescription post={ post } /></li>) }
        </ul>
      </section>
    </div>
  )
}

function PostDescription(props: { post: BlogPostAnnotation }) {
  const classes = useStyles();

  return (
    <div className="post-template">
      <h1 className={ classes.postTitle }>
        <Link
          title={ props.post.title }
          href="/blog/archive/[year]/[month]/[slug]"
          as={postUrl(props.post)}>
          { props.post.title }
        </Link>
      </h1>

      {/* Posted date */}
      <div className={ classes.postDate }>
        <TimeIcon /> { dateToString(new Date(props.post.postedOn)) }
      </div>

      <div className="post-desc blog-post-content">
        <BlogPostContent urlSlug={props.post.urlSlug} markdownContent={props.post.annotation} />
      </div>

      <hr className={ classes.blogPostFooterDelimiter } />

      {/* <BlogPostFooter post={props.post} /> */}
    </div>
  );
}

function postUrl(post: BlogPostAnnotation) {
  const postedOn = new Date(post.postedOn);
  return `/blog/archive/${postedOn.getFullYear()}/${postedOn.getMonth()}/${post.urlSlug}`;
}

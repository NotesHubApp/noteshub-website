import { RssIcon, TimeIcon } from 'components/icons';

import { BlogPostAnnotation } from 'models/BlogPost';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { dateToString } from 'utils/dateUtils';

const useStyles = createUseStyles({
  container: {
    maxWidth: 'var(--max-content-width)',
    padding: '15px 15px',
    margin: '0 auto'
  },
  listSubtitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.2em',
    fontSize: 'var(--heading1-size)',

    '& a': {
      height: '1em'
    },

    '& svg': {
      width: '1em'
    }
  },
  postsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  postTitle: {
    color: 'var(--theme-color)',
    fontWeight: 'bold',
    fontSize: '2.2em',
    marginBottom: '10px',

    '& a:hover': {
      textDecoration: 'underline'
    }
  },
  postInfo: {
    display: 'flex',
    gap: '5px',
    color: '#7f919e',
    fill: '#7f919e',
    '& svg': {
      width: '1em'
    }
  },
  category: {
    textTransform: 'uppercase'
  }
})


type BlogPostsListProps = {
  subtitle: string;
  posts: BlogPostAnnotation[]
}

export default function BlogPostsList(props: BlogPostsListProps) {
  const classes = useStyles();

  return (
    <div className={ classes.container }>
      <section id="content">
        <h1 className={ classes.listSubtitle }>
          <span>{ props.subtitle }</span>
          <a href="feed.xml">
            <RssIcon />
          </a>
        </h1>

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

      <div className={ classes.postInfo }>
        <TimeIcon /> { dateToString(new Date(props.post.postedOn)) } •
        <span className={ classes.category }>{ props.post.category.name }</span>
      </div>

      <div className="post-desc blog-post-content">
        <p>{ props.post.description }</p>
      </div>
    </div>
  );
}

function postUrl(post: BlogPostAnnotation) {
  const postedOn = new Date(post.postedOn);
  return `/blog/archive/${postedOn.getFullYear()}/${postedOn.getMonth()}/${post.urlSlug}`;
}

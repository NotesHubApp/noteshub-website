import { RssIcon, TimeIcon } from 'components/icons';

import { BlogPostAnnotation } from 'models/BlogPost';
import Link from 'next/link';
import { Routes } from 'utils/Routes';
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
    gap: '3px',
    color: '#7f919e',
    fill: '#7f919e',
    fontSize: '0.8em',
    '& svg': {
      width: '1em'
    }
  },
  category: {
    textTransform: 'uppercase',
    marginRight: '0.6em'
  },
  postDescription: {
    fontSize: '1.2em'
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
          as={Routes.blogPost(props.post)}>
          { props.post.title }
        </Link>
      </h1>

      <div className={ classes.postInfo }>
      <span className={ classes.category }>{ props.post.category.name }</span>
        <TimeIcon /> { dateToString(new Date(props.post.postedOn)) }

      </div>

      <div className="post-desc blog-post-content">
        <p className={ classes.postDescription }>{ props.post.description }</p>
      </div>
    </div>
  );
}

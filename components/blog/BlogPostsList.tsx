import { BlogPostAnnotation } from 'models/BlogPost';
import { BlogPostInfo } from './BlogPostInfo';
import Link from 'next/link';
import { Routes } from 'utils/Routes';
import { RssIcon } from 'components/icons';
import { createUseStyles } from 'react-jss';

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
    <article>
      <h1 className={ classes.postTitle }>
        <Link
          title={ props.post.title }
          href="/blog/archive/[year]/[month]/[slug]"
          as={Routes.blogPost(props.post)}>
          { props.post.title }
        </Link>
      </h1>

      <BlogPostInfo post={props.post} />
      <p className={ classes.postDescription }>{ props.post.description }</p>
    </article>
  );
}

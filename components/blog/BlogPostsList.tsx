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
  postListItem: {
    marginBottom: '30px'
  },
  postCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'var(--card-background)',
    boxShadow: 'var(--box-shadow)',
    borderRadius: '10px',
    overflow: 'hidden',

    '@media (max-width: 550px)': {
      flexDirection: 'column'
    },

    '&:hover': {
      '--scale': 1.03
    }
  },
  postHeroContainer: {
    overflow: 'hidden',
    width: '40%',
    minWidth: '40%',

    '@media (max-width: 550px)': {
      width: '100%',
      minWidth: '100%',
      aspectRatio: '16/9'
    }
  },
  postHero: {
    width: '100%',
    height: '100%',
    minHeight: '220px',
    objectFit: 'cover',
    transform: 'scale(var(--scale))',
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms, opacity 1s cubic-bezier(0.4, 0, 0.25, 1) 0ms'
  },
  postContent: {
    padding: '15px'
  },
  postTitle: {
    color: 'var(--theme-color)',
    fontWeight: 'bold',
    fontSize: '2em',
    marginTop: 0,
    marginBottom: '10px',

    '& a:hover': {
      textDecoration: 'underline'
    }
  },
  postDescription: {
    fontSize: '1.2em',
    lineHeight: 1.5
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
          { props.posts.map(post => (
            <li key={ post.urlSlug } className={ classes.postListItem }>
              <PostCard post={ post } />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function PostCard(props: { post: BlogPostAnnotation }) {
  const classes = useStyles();

  return (
    <Link
      title={ props.post.title }
      href="/blog/archive/[year]/[month]/[slug]"
      as={Routes.blogPost(props.post)}
    >
      <div className={ classes.postCardContainer }>
        { props.post.image && (
          <div className={ classes.postHeroContainer }>
            <img className={ classes.postHero } src={ props.post.image } />
          </div>
        )}

        <article className={ classes.postContent }>
          <h1 className={ classes.postTitle }>
            { props.post.title }
          </h1>

          <BlogPostInfo post={props.post} />
          <p className={ classes.postDescription }>{ props.post.description }</p>
        </article>
      </div>
    </Link>
  );
}

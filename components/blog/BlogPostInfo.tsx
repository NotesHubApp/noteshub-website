import { BlogPostAnnotation } from 'models/BlogPost';
import { TimeIcon } from 'components/icons';
import { createUseStyles } from 'react-jss';
import { dateToString } from 'utils/dateUtils';

const useStyles = createUseStyles({
  postInfo: {
    display: 'flex',
    alignItems: 'center',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    gap: '3px',
    color: '#7f919e',
    fill: '#7f919e',
    fontSize: '0.8em',
    '& svg': {
      width: '1em'
    },
    '& li': {
      display: 'flex'
    }
  },
  category: {
    textTransform: 'uppercase',
    marginRight: '0.6em'
  },
})

type BlogPostInfoProps = {
  post: BlogPostAnnotation
}

export function BlogPostInfo(props: BlogPostInfoProps) {
  const classes = useStyles();

  return (
    <ul className={ classes.postInfo }>
      <li className={ classes.category }>
        { props.post.category.name }
      </li>
      <li>
        <TimeIcon />
        <span>{ dateToString(new Date(props.post.postedOn)) }</span>
      </li>
  </ul>
  )
}

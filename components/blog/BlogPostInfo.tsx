import { BlogPostAnnotation } from 'models/BlogPost';
import { TimeIcon } from 'components/icons';
import { createUseStyles } from 'react-jss';
import { dateToString } from 'utils/dateUtils';

const useStyles = createUseStyles({
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
})

type BlogPostInfoProps = {
  post: BlogPostAnnotation
}

export function BlogPostInfo(props: BlogPostInfoProps) {
  const classes = useStyles();

  return (
    <div className={ classes.postInfo }>
      <span className={ classes.category }>{ props.post.category.name }</span>
      <TimeIcon /> { dateToString(new Date(props.post.postedOn)) }
  </div>
  )
}

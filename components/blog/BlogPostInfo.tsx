import { BlogPostAnnotation } from 'models/BlogPost';
import { TimeIcon } from 'components/icons';
import { createUseStyles } from 'react-jss';
import { dateToString } from 'utils/dateUtils';

const useStyles = createUseStyles({
  postInfo: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    gap: '10px',
    color: '#7f919e',
    fill: '#7f919e',
    fontSize: '0.8em',
    '& svg': {
      width: '1em'
    }
  },
  category: {
    textTransform: 'uppercase'
  },
  postedOn: {
    display: 'flex',
    gap: '3px'
  }
})

type BlogPostInfoProps = {
  post: BlogPostAnnotation
}

export function BlogPostInfo(props: BlogPostInfoProps) {
  const classes = useStyles();

  return (
    <div className={ classes.postInfo }>
      <div className={ classes.category }>
        { props.post.category.name }
      </div>
      <div className={ classes.postedOn }>
        <TimeIcon />
        <span>{ dateToString(new Date(props.post.postedOn)) }</span>
      </div>
    </div>
  )
}

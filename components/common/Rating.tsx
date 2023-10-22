import { createUseStyles } from 'react-jss'

type RatingProps = {
  value: number
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    gap: '0.3em',
    fontSize: '1.2em'
  },
  star: {
    '&:after': {
      content: '"★"'
    },
    '&[data-checked=true]': {
      color: 'gold'
    }
  }
})

export function Rating({ value }: RatingProps) {
  const classes = useStyles();

  return (
    <div className={ classes.container }>
      { Array.from(Array(5).keys()).map(n => (
        <span key={ n } className={ classes.star } data-checked={ (n + 1) <= value } />
      ))}
    </div>
  )
}

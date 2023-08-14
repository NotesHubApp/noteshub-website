import Link from 'next/link';
import { createUseStyles } from 'react-jss'

type DiscountLabelProps = {
  value: number
}

const useStyles = createUseStyles({
  container: {
    position: 'fixed',
    zIndex: 10000,
    top: 0,
    right: 0,
    transform: 'rotate(45deg) translateX(25px) translateY(-100px)',
    transformOrigin: 'bottom left',
    width: '200px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    color: 'var(--background-paper)',
    background: 'var(--theme-color)',
    padding: '3px 0',
    fontWeight: 'bold'
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3px'
  },
  off: {
    textTransform: 'uppercase',
    fontSize: '0.7em'
  }
})

export function DiscountLabel(props: DiscountLabelProps) {
  const classes = useStyles();

  return (
    <Link href="/#feature-comparison">
      <div className={ classes.container }>
        <div className={ classes.line }>
          <span>{ props.value }%</span>
          <span className={ classes.off }>OFF</span>
        </div>
      </div>
    </Link>
  )
}

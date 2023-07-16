import { PropsWithChildren } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  badge: {
    color: '#a0a0a0',
    backgroundColor: '#f0f0f0',
    border: '1px solid #e5e5e5',
    borderRadius: '5px',
    padding: '3px 10px'
  }
})

type BadgeProps = {

}

export function Badge(props: PropsWithChildren<BadgeProps>) {
  const classes = useStyles();

  return (
    <span className={ classes.badge }>
      { props.children }
    </span>
  )
}

import { PropsWithChildren } from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  title: {
    fontSize: '45px',
    textAlign: 'center'
  }
})


export function SectionTitle(props: PropsWithChildren<{}>) {
  const classes = useStyles();

  return (
    <h1 className={ classes.title }>{ props.children }</h1>
  )
}

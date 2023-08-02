import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  spacer: {
    flexGrow: 1
  }
})

export function Spacer() {
  const classes = useStyles();

  return <div className={ classes.spacer }></div>
}

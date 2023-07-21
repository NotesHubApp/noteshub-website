import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  shareList: {
    listStyleType: 'none',
    display: 'flex'
  }
})

type ShareButtonsProps = {

}

export function ShareButtons(props: ShareButtonsProps) {
  const classes = useStyles();

  return (
    <ul className={ classes.shareList }>

    </ul>
  )
}

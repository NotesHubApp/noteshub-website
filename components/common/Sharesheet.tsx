import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon
} from 'components/icons';

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  shareList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '1em'
  }
})

type ShareButtonsProps = {

}

export function Sharesheet(props: ShareButtonsProps) {
  const classes = useStyles();

  return (
    <ul className={ classes.shareList }>
      <a>
        <FacebookIcon />
      </a>

      <a>
        <TwitterIcon />
      </a>

      <a>
        <EmailIcon />
      </a>
    </ul>
  )
}

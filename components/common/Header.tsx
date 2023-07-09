import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: '20px',
    backdropFilter: 'saturate(180%) blur(5px)',
    borderBottom: '1px solid var(--divider-color)',
    background: 'var(--header-bg)',
    color: 'gray',
    gap: '20px',
    zIndex: 200
  }
})

export default function Header() {
  const styles = useStyles();

  return (
    <div className={ styles.container }>
      <a>Home</a>
      <a>Blog</a>
      <a>About</a>
    </div>
  )
}

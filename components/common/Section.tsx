import { PropsWithChildren } from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    textAlign: 'center',
    margin: '50px 0',
    width: 'min(1140px, 100%)'
  }
})

type SectionProps = {
  id: string
}

export function Section(props: PropsWithChildren<SectionProps>) {
  const classes = useStyles();

  return (
    <div id={ normalizeId(props.id) } className={ classes.container }>
      { props.children }
    </div>
  )
}

function normalizeId(sectionId: string) {
  return sectionId.toLowerCase().replace(' ', '-')
}

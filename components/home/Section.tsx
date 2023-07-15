import clsx from 'clsx';
import { PropsWithChildren } from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    textAlign: 'center',
    padding: '50px 15px',
    width: 'min(1140px, 100%)'
  }
})

type SectionProps = {
  id: string,
  className?: string
}

export function Section(props: PropsWithChildren<SectionProps>) {
  const classes = useStyles();

  return (
    <div id={ normalizeId(props.id) } className={ clsx(classes.container, props.className) }>
      { props.children }
    </div>
  )
}

function normalizeId(sectionId: string) {
  return sectionId.toLowerCase().replace(' ', '-')
}

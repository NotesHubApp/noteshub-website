import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  section: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  alternateSection: {
    flexDirection: 'row-reverse'
  },
  column: {
    flex: '50%'
  },
  image: {
    display: 'block',
    margin: '20px auto'
  },
  title: {
    textAlign: 'center'
  }
});

type SectionProps = {
  title: string;
  imageSrc: string;
  children: ReactNode;
  isAlternate: boolean;
}

export default function Section({ title, imageSrc, children, isAlternate }: SectionProps) {
  const classes = useStyles();

  return (
    <div className={ isAlternate ? `${classes.section} ${classes.alternateSection}` : classes.section }>
      <div className={ classes.column }>
        <img className={ classes.image } src={ imageSrc } />
      </div>

      <div className={ classes.column }>
        <h2 className={ classes.title }>{ title }</h2>
        { children }
      </div>
    </div>
  )
}

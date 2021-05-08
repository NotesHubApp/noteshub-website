import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  featureCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  alternateFeatureCard: {
    flexDirection: 'row-reverse'
  },
  column: {
    flex: '50%',
    alignSelf: 'center',
    margin: '0 20px'
  },
  '@media only screen and (max-width: 800px)': {
    featureCard: {
      flexDirection: 'column'
    },
    alternateFeatureCard: {
      flexDirection: 'column'
    },
    column: {
      margin: '0'
    }
  },
  image: {
    display: 'block',
    margin: '20px auto',
    maxWidth: '100%',
    maxHeight: 'min(80vh, 600px)',
    borderRadius: '8px',
    boxShadow: '0 5px 10px rgb(0 0 0 / 12%)'
  },
  noShadow: {
    boxShadow: 'none'
  },
  title: {
    textAlign: 'center'
  },
  description: {
    fontSize: '20px',
    padding: '0 30px',
    textIndent: '20px'
  }
});

type FeatureCardProps = {
  title: string;
  mobileImageSrc: string;
  desktopImageSrc: string;
  children: ReactNode;
  isAlternate: boolean;
  disableImageShadow?: boolean;
}

export default function FeatureCard({ title, mobileImageSrc, desktopImageSrc, disableImageShadow, children, isAlternate }: FeatureCardProps) {
  const classes = useStyles();
  const featureCardClasses = isAlternate ?
    `${classes.featureCard} ${classes.alternateFeatureCard}` :
    classes.featureCard;

  const imageClasses = disableImageShadow ?
    `${classes.image} ${classes.noShadow}` :
    classes.image

  return (
    <div className={ featureCardClasses }>
      <div className={ classes.column }>
        <h2 className={ classes.title }>{ title }</h2>
        <p className={ classes.description }>{ children }</p>
      </div>

      <div className={ classes.column }>
        <picture>
          <source media="(max-width: 800px)" srcSet={ mobileImageSrc } />
          <img className={ imageClasses } src={ desktopImageSrc } />
        </picture>
      </div>
    </div>
  )
}

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
  '@media only screen and (max-width: 800px)': {
    featureCard: {
      flexDirection: 'column'
    },
    alternateFeatureCard: {
      flexDirection: 'column'
    },
  },
  column: {
    flex: '50%',
    alignSelf: 'center'
  },
  image: {
    display: 'block',
    margin: '20px auto',
    maxWidth: '100%',
    maxHeight: 'min(80vh, 600px)',
    borderRadius: '8px',
    boxShadow: '0 5px 10px rgb(0 0 0 / 12%)'
  },
  title: {
    textAlign: 'center'
  },
  description: {
    fontSize: '20px',
    padding: '0 30px'
  }
});

type FeatureCardProps = {
  title: string;
  mobileImageSrc: string;
  desktopImageSrc: string;
  children: ReactNode;
  isAlternate: boolean;
}

export default function FeatureCard({ title, mobileImageSrc, desktopImageSrc, children, isAlternate }: FeatureCardProps) {
  const classes = useStyles();
  const featureCardClass = isAlternate ?
    `${classes.featureCard} ${classes.alternateFeatureCard}` :
    classes.featureCard

  return (
    <div className={ featureCardClass }>
      <div className={ classes.column }>
        <h2 className={ classes.title }>{ title }</h2>
        <p className={ classes.description }>{ children }</p>
      </div>

      <div className={ classes.column }>
        <picture>
          <source media="(max-width: 800px)" srcSet={ mobileImageSrc } />
          <img className={ classes.image } src={ desktopImageSrc } />
        </picture>
      </div>
    </div>
  )
}

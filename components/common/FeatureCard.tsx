import {
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  featureCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  alternateFeatureCard: {
    flexDirection: 'row-reverse',
    background: 'var(--alternative-raw-color)'
  },
  column: {
    flex: '50%',
    alignSelf: 'center',
    margin: '0 30px'
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
    margin: '30px auto',
    maxWidth: '100%',
    maxHeight: 'min(80vh, 600px)',
    borderRadius: '8px',
    boxShadow: 'var(--box-shadow)'
  },
  noShadow: {
    boxShadow: 'none'
  },
  title: {
    textAlign: 'center',
    margin: '20px 30px'
  },
  description: {
    fontSize: '1.3em',
    padding: '0 30px',
    textIndent: '20px',
    lineHeight: '1.5'
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

export default function FeatureCard({
  title,
  mobileImageSrc,
  desktopImageSrc,
  disableImageShadow,
  children,
  isAlternate
}: FeatureCardProps) {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const colorSchemeAttrName = 'data-color-scheme';
    setDarkMode(document.documentElement.getAttribute(colorSchemeAttrName) === 'dark');

    const callback: MutationCallback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.attributeName === colorSchemeAttrName) {
          setDarkMode(document.documentElement.getAttribute(colorSchemeAttrName) === 'dark');
        }
      }
    }

    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const getUrl = useCallback((baseUrl: string) => {
    if (!darkMode) {
      return baseUrl;
    }

    const extDelimiter = baseUrl.lastIndexOf('.');
    return baseUrl.substring(0, extDelimiter) + '-dark' + baseUrl.substring(extDelimiter);
  }, [darkMode]);

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
          <img className={ imageClasses } src={ getUrl(desktopImageSrc) } />
        </picture>
      </div>
    </div>
  )
}

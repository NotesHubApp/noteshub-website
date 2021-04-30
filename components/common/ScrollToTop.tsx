import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  scrollToTop: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    animation: '$fadeIn 700ms ease-in-out both',
    cursor: 'pointer',
    color: 'white',
    background: 'var(--theme-color)',
    padding: '7px 10px',
    borderRadius: '100%'
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  }
});

export default function ScrollToTop() {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 150) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);
    return () => { document.removeEventListener('scroll', toggleVisibility); }
  }, []);

  return (
    <div>
      { visible && (
        <span className={ classes.scrollToTop } onClick={ scrollToTop }>
          🡩
        </span>
      )}
    </div>
  )
}

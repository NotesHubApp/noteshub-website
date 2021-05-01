import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  scrollToTop: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    animation: '$fadeIn 700ms ease-in-out both',
    cursor: 'pointer',
    '& svg': {
      fill: 'var(--theme-color)',
      width: '35px',
      height: '35px',
      opacity: '0.3',

      '&:hover': {
        opacity: '1'
      }
    }
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
    scrollToTarget(window.document.documentElement);
  }

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);
    return () => { document.removeEventListener('scroll', toggleVisibility); }
  }, []);

  return (
    <div>
      { visible && (
        <span className={ classes.scrollToTop } onClick={ scrollToTop }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
          </svg>
        </span>
      )}
    </div>
  )
}

const easeInQuad = function(t: number) {
  return t * t;
};

const scrollToTarget = function(target: Element, duration: number = 400, animationFunction: (t: number) => number = easeInQuad) {
  const top = target.getBoundingClientRect().top;
  const startPos = window.pageYOffset;
  const diff = top;

  let startTime: DOMHighResTimeStamp | null = null;
  let requestId: number;

  const loop = (currentTime: DOMHighResTimeStamp) => {
      if (!startTime) {
          startTime = currentTime;
      }

      // Elapsed time in miliseconds
      const time = currentTime - startTime;

      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startPos + diff * animationFunction(percent));

      if (time < duration) {
          // Continue moving
          requestId = window.requestAnimationFrame(loop);
      } else {
          window.cancelAnimationFrame(requestId);
      }
  };
  requestId = window.requestAnimationFrame(loop);
};

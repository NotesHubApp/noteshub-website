import {
  CopyIcon,
  DoneIcon,
  WrapTextIcon
} from '../icons'
import { PropsWithChildren, memo, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {
    position: 'relative',

    '&:hover button': {
      opacity: '.4'
    },

    '& button:focus-visible,button:hover': {
      opacity: '1!important'
    },

    '& pre': {
      display: 'flex',
      minHeight: '54px',
      alignItems: 'center'
    }
  },
  wordWrap: {
    '& code': {
      whiteSpace: 'pre-wrap',
      overflowWrap: 'anywhere'
    }
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    gap: '0.2rem',
    top: '10px',
    right: '10px'
  },
  button: {
    minWidth: 0,
    lineHeight: 0,
    padding: '0.4rem',
    color: 'var(--codeBlock-textColor)',
    borderColor: 'var(--codeBlock-borderColor)',
    borderRadius: '4px',
    border: '1px solid',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    opacity: 0,

    '&:hover': {
      borderColor: 'var(--codeBlock-borderColor)',
      backgroundColor: 'var(--codeBlock-backgroundColor)'
    },

    '& svg': {
      width: '1.2rem',
      height: '1.2rem',
    }
  }
})

type CodeBlockProps = {
  sourceCode?: string
  className?: string
}

function CodeBlockComponent(props: PropsWithChildren<CodeBlockProps>) {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canWordWrap, setCanWordWrap] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const codeElement = containerRef.current?.querySelector('code');
      if (codeElement) {
        setCanWordWrap(codeElement.scrollWidth > codeElement.clientWidth);
      }
    });

    containerRef.current && resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const onToggleWordWrap = () => {
    setWordWrap(value => !value);
  }

  const onCopySourceCode = async () => {
    if (navigator.clipboard && props.sourceCode) {
      await navigator.clipboard.writeText(props.sourceCode);
      setDone(true);
      setTimeout(() => { setDone(false); }, 1000);
    }
  }

  return (
    <div ref={ containerRef } className={ clsx(classes.container, wordWrap && classes.wordWrap)}>
      <pre className={ props.className }>
        { props.children }
      </pre>

      <div className={ classes.buttonGroup }>
        { (canWordWrap || wordWrap) && (
          <button
            aria-label='Toggle word wrap'
            className={ classes.button }
            onClick={ onToggleWordWrap }
          >
            <WrapTextIcon color={ wordWrap ? 'var(--theme-color)': 'inherit' } />
          </button>
        )}
        { props.sourceCode && (
          <button
            aria-label='Copy code to clipboard'
            className={ classes.button }
            onClick={ onCopySourceCode }
          >
            { done ? <DoneIcon color='var(--success-color)' /> : <CopyIcon /> }
          </button>
        )}
      </div>
    </div>
  )
}

export const CodeBlock = memo(CodeBlockComponent);

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {
    textAlign: 'left',
    paddingLeft: 0
  },
  panel: {
    listStyle: 'none'
  },
  panelHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'var(--alternative-raw-color)',
    cursor: 'pointer',
    padding: '18px',
    width: '100%',
    textAlign: 'left',
    fontSize: 'initial',
    fontWeight: 'bold',
    border: 'none',
    outline: 'none',
    transition: '0.4s',

    '&:hover': {
      filter: 'contrast(0.9)'
    }
  },
  panelTitle: {
    flexGrow: 1,
    filter: 'contrast(0.5)'
  },
  sign: {
    stroke: 'var(--theme-color)',
    strokeWidth: '2px',
    flexShrink: 0
  },
  panelContent: {
    padding: '0 18px',
    lineHeight: '1.5em',
    backgroundColor: 'var(--background-paper)',
    overflow: 'hidden',
    transition: 'height 0.2s ease-out',

    '& a': {
      textDecoration: 'underline'
    }
  },
  panelContentInner: {
    padding: '10px 0'
  }
})

export type AccordionModel = {
  title: ReactNode
  content: ReactNode,
  active?: boolean
}

type AccordionProps = {
  data: AccordionModel[]
  setData: Dispatch<SetStateAction<AccordionModel[]>>
}

export function Accordion(props: AccordionProps) {
  const classes = useStyles();

  const toggleAccordion = (accordion: AccordionModel) => {
    props.setData(data => {
      return data.map(acc => ({
        title: acc.title,
        content: acc.content,
        active: acc === accordion ? !acc.active : acc.active
      }))
    })
  }

  return (
    <ul className={ classes.container }>
      { props.data.map(accordion => (
        <React.Fragment key={ accordion.title?.toString() ?? '' }>
          <Panel model={ accordion } toggle={ () => toggleAccordion(accordion) }/>
        </React.Fragment>
      )) }
    </ul>
  )
}

type PanelProps = {
  model: AccordionModel
  toggle(): void
}

function Panel({ model, toggle }: PanelProps) {
  const classes = useStyles();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.style.height = model.active ? `${contentElement.scrollHeight}px` : '0';
    }
  }, [model.active]);

  const ExpandSign = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={ classes.sign } viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
    </svg>
  )

  const ColapseSign = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={ classes.sign } viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
    </svg>
  )

  return (
    <li className={ classes.panel }>
      <button className={ classes.panelHeading } onClick={ toggle }>
        <div className={ classes.panelTitle }>{ model.title }</div>
        { model.active ? <ColapseSign /> : <ExpandSign /> }
      </button>
      <div ref={ contentRef } className={ classes.panelContent }>
        <div className={ classes.panelContentInner }>
          { model.content }
        </div>
      </div>
    </li>
  )
}

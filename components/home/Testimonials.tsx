import {
  AppStoreIcon,
  GooglePlayIcon,
  WindowsStoreIcon
} from 'components/icons';
import { MouseEvent, PropsWithChildren, useRef, useState } from 'react';
import { Testimonial, TestimonialOrigin } from 'models/Testimonial';

import { Rating } from 'components/common/Rating';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import { Spacer } from 'components/common/Spacer';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import testimonials from 'data/testimonials';

const useStyles = createUseStyles({
  testimonialsList: {
    display: 'block',
    columnCount: 3,
    gap: '20px',
    listStyle: 'none',
    padding: 0,

    '@media (max-width: 750px)': {
      columnCount: 2
    },
    '@media (max-width: 500px)': {
      columnCount: 1
    },
  },
  testimonialCardWrapper: {
    columnBreakInside: 'avoid',
    // This is to fix box-shadow in multi-column combination in Safari
    padding: '5px',

    '& article': {
      marginBottom: '20px',
      cursor: 'pointer'
    }
  },
  testimonialCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'initial',
    boxShadow: 'var(--box-shadow)',
    background: 'var(--card-background)',
    borderRadius: '10px',
    padding: '20px',
    overflowY: 'auto'
  },
  authorName: {
    margin: 0
  },
  headerLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialSourceIcon: {
    '& svg': {
      width: '1.7em',
      height: '1.7em',
      opacity: 0.3,

      '&:hover': {
        opacity: 1
      }
    }
  },
  testimonialContent: {
    lineHeight: 1.5,
    margin: '10px 0',
    overflow: 'auto'
  },
  truncatedContent: {
    // Make ellipsis on long content
    display: 'box',
    lineClamp: 10,
    boxOrient: 'vertical',
    overflow: 'hidden'
  },
  postedOn: {
    fontSize: '90%',
    color: 'gray'
  },
  fullScreenCard: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 'var(--max-content-width)',
    border: 'none',
    outline: 'none',
    padding: 0,
    boxShadow: 'var(--box-shadow)',
    borderRadius: '10px'
  }
})

type TestimonialsProps = {
  data?: Testimonial[]
}

export default function Testimonials({ data = testimonials }: TestimonialsProps) {
  const classes = useStyles();
  const fullCardDialorRef = useRef<HTMLDialogElement>(null);
  const [fullScreenCard, setFullScreenCard] = useState<Testimonial | undefined>();

  const onCardClick = (testimonial: Testimonial) => {
    setFullScreenCard(testimonial);
    fullCardDialorRef.current?.showModal();
  }

  const onFullScreenCardClick = () => {
    fullCardDialorRef.current?.close();
    setFullScreenCard(undefined);
  }

  return (
    <Section id="testimonials">
      <SectionTitle>Wall of Love</SectionTitle>
      <ul className={ classes.testimonialsList }>
        { data.map(testimonial => (
          <li
            key={ `${testimonial.origin}-${testimonial.author.name}` }
            className={ classes.testimonialCardWrapper }
            onClick={ () => onCardClick(testimonial) }
          >
            <TestimonialCard testimonial={testimonial} />
          </li>

        ))}
      </ul>

      <dialog
        ref={ fullCardDialorRef }
        onClick={ onFullScreenCardClick }
        className={ classes.fullScreenCard }
      >
        { fullScreenCard && (
          <TestimonialCard testimonial={ fullScreenCard } fullScreen />
        )}
      </dialog>
    </Section>
  )
}

type TestimonialCardProps = {
  testimonial: Testimonial
  fullScreen?: boolean
}

function TestimonialCard({ testimonial, fullScreen }: TestimonialCardProps) {
  const classes = useStyles();

  return (
    <article className={ classes.testimonialCard }>
      <header>
        <div className={ classes.headerLine }>
          <h3 className={ classes.authorName }>{ testimonial.author.name }</h3>
          <Spacer />
          <TestimonialSource origin={ testimonial.origin } sourceUrl={ testimonial.sourceUrl } />
        </div>

        { testimonial.rating && <Rating value={ testimonial.rating } /> }
      </header>
      <div className={ clsx(classes.testimonialContent, !fullScreen && classes.truncatedContent) }>{ testimonial.content }</div>
      <footer className={ classes.postedOn }>
        { testimonial.date.toLocaleDateString(undefined, { dateStyle: 'medium' }) }
      </footer>
    </article>
  )
}

type TestimonialSourceProps = {
  origin: TestimonialOrigin
  sourceUrl?: string
}

function TestimonialSource(props: TestimonialSourceProps) {
  switch (props.origin) {
    case 'AppStore':
      return (
        <IconWithLink url={ process.env.NEXT_PUBLIC_APPSTORE_APPURL }>
          <AppStoreIcon />
        </IconWithLink>
      )

    case 'PlayStore':
      return (
        <IconWithLink url={ process.env.NEXT_PUBLIC_GOOGLEPLAY_APPURL }>
          <GooglePlayIcon />
        </IconWithLink>
      )

    case 'WindowsStore':
      return (
        <IconWithLink url={ process.env.NEXT_PUBLIC_WINDOWSSTORE_APPURL }>
          <WindowsStoreIcon />
        </IconWithLink>
      )
  }

  return null;
}

function IconWithLink(props: PropsWithChildren<{ url?: string}>) {
  const classes = useStyles();

  const onLinkClick = (e: MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <a
      className={ classes.testimonialSourceIcon }
      href={ props.url }
      onClick={ onLinkClick }
      target='_blank' rel='noopener noreferrer'
    >
      { props.children }
    </a>
  )
}

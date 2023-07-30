import { Rating } from 'components/common/Rating';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import { Testimonial } from 'models/Testimonial';
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
    padding: '5px'
  },
  testimonialCard: {
    textAlign: 'initial',
    boxShadow: 'var(--box-shadow)',
    background: 'var(--card-background)',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px'
  },
  authorName: {
    marginTop: 0
  },
  testimonialContent: {
    lineHeight: 1.5,

    // Make ellipsis on long content
    display: 'box',
    lineClamp: 10,
    boxOrient: 'vertical',
    overflow: 'hidden',
    margin: '10px 0'
  },
  postedOn: {
    fontSize: '90%',
    color: 'gray'
  }
})

type TestimonialsProps = {
  data?: Testimonial[]
}

export default function Testimonials({ data = testimonials }: TestimonialsProps) {
  const classes = useStyles();

  return (
    <Section id="testimonials">
      <SectionTitle>Wall of Love</SectionTitle>
      <ul className={ classes.testimonialsList }>
        { data.map(testimonial => (
          <TestimonialCard
            key={ `${testimonial.origin}-${testimonial.author.name}` }
            testimonial={testimonial} />)
        )}
      </ul>
    </Section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const classes = useStyles();

  return (
    <li className={ classes.testimonialCardWrapper }>
      <article className={ classes.testimonialCard }>
        <header>
          <h3 className={ classes.authorName }>{ testimonial.author.name }</h3>
          { testimonial.rating && <Rating value={ testimonial.rating } /> }
        </header>
        <div className={ classes.testimonialContent }>{ testimonial.content }</div>
        <footer className={ classes.postedOn }>
          { testimonial.date.toLocaleDateString(undefined, { dateStyle: 'medium' }) }
        </footer>
      </article>
    </li>
  )
}


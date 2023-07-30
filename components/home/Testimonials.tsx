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

    /* Force new columns */
    '&::before,&::after': {
      content: '""',
      flexBasis: '100%',
      width: '0',
      order: 2
    }
  },
  testimonialCard: {
    textAlign: 'initial',
    boxShadow: 'var(--box-shadow)',
    borderRadius: '10px',
    padding: '20px',
    columnBreakInside: 'avoid',

    /* Re-order items into rows */
    '&:nth-child(3n+1)': { order: 1 },
    '&:nth-child(3n+2)': { order: 2 },
    '&:nth-child(3n)':   { order: 3 }
  },
  testimonialContent: {
    lineHeight: 1.5
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
      <div className={ classes.testimonialsList }>
        { data.map(testimonial => (
          <TestimonialCard
            key={ `${testimonial.origin}-${testimonial.author.name}` }
            testimonial={testimonial} />)
        )}
      </div>
    </Section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const classes = useStyles();

  return (
    <article className={ classes.testimonialCard }>
      <header>
        <h3>{ testimonial.author.name }</h3>
        { testimonial.rating && <Rating value={ testimonial.rating } /> }
      </header>
      <div className={ classes.testimonialContent }>{ testimonial.content }</div>
      <footer>
        { testimonial.date.toLocaleDateString(undefined, { dateStyle: 'medium' }) }
      </footer>
    </article>
  )
}


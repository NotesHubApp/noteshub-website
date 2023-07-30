import { Rating } from 'components/common/Rating';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import { Testimonial } from 'models/Testimonial';
import { createUseStyles } from 'react-jss';
import testimonials from 'data/testimonials';

const useStyles = createUseStyles({
  testimonialsList: {
    display: 'flex',
    gap: '20px'
  },
  testimonialCard: {
    textAlign: 'initial',
    boxShadow: '0 4px 6px -1px #5d5dff40, 0 2px 4px -2px #5d5dff40',
    borderRadius: '10px',
    padding: '20px'
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


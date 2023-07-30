import { Testimonial } from 'models/Testimonial';

const testimonials: Testimonial[] = [
  {
    author: {
      name: 'Mmemonic4'
    },
    content: (
      <p>
        Lightweight, intuitive, and highly functional. In my experience, it outperforms many other applications I have tried, particularly when it comes to executing the Kanban board and organizing notes in separate folders.
      </p>
    ),
    rating: 5,
    date: new Date('Jun 19, 2023'),
    origin: 'AppStore'
  },

  {
    author: {
      name: 'Phrodide',
    },
    content: (
      <>
        <p>
          I manage a group of volunteers for a non profit and they recently came to me and said they wanted to start blogging on the website. We use Cloudflare and static pages so this meant integrating into the JAMStack. With the GitHub integration this became possible for the non-technical volunteers.
        </p>
        <p>
          What even better? They can insert pictures and they also upload to GitHub and link properly. Looks right on the website, looks right on this app.
        </p>
      </>
    ),
    rating: 5,
    date: new Date('Mar 8, 2023'),
    origin: 'AppStore'
  }
];

export default testimonials;

import { Testimonial } from 'models/Testimonial';

const testimonials: Testimonial[] = [
  // App Store
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
  },

  // Play Store
  {
    author: {
      name: 'fullmetal chocobo'
    },
    content: (
      <p>
        So easy to take simple notes and organize thoughts, I have used this daily for years now. And it is even more useful now with the addition of kanban boards. I ABSOLUTELY LOVE THIS APP!!
      </p>
    ),
    rating: 5,
    date: new Date('Apr 23, 2023'),
    origin: 'PlayStore'
  },

  {
    author: {
      name: 'Roman Kurnovskii'
    },
    content: (
      <p>
        Excellent app, cross platform, can sync with private repos
      </p>
    ),
    rating: 5,
    date: new Date('Mar 3, 2023'),
    origin: 'PlayStore'
  },

  // Windows Store
  {
    author: {
      name: 'Luuk'
    },
    content: (
      <p>
        I love the simplicity of this app. All you need is a git repository somewhere (I use GitHub) and you can start writing markdown. No worrying about your data only being available from a single vendor somewhere in the cloud; even if this app would become unavailable, your data is safe. It's not super rich in features, but if you just need markdown support (including images!) and/or simple Kanban it's perfect.
      </p>
    ),
    rating: 5,
    date: new Date('Jul 27, 2023'),
    origin: 'WindowsStore'
  },
  {
    author: {
      name: 'Emeka Michael Dante'
    },
    content: (
      <p>
        Amazing note taking app, with lots of optionality in how you take notes, highlight important parts and add visual aids to your notes.
      </p>
    ),
    rating: 5,
    date: new Date('Jun 08, 2023'),
    origin: 'WindowsStore'
  }
];

export default testimonials;

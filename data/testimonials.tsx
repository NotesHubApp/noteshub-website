import { Testimonial } from 'models/Testimonial';

/**
 * IMPORTANT: We are not using paragraphs here intentionaly.
 * Safari does not support -webkit-line-clamp property for block children.
 */
const testimonials: Testimonial[] = [
  // App Store
  {
    author: {
      name: 'Monbun123'
    },
    content: (
      <>
        I’ve been using this app for a while now and it’s amazing. Has so many great features and I’m able to sync it with all my devices. Highly recommend for anyone who needs an efficient notes app!
      </>
    ),
    rating: 5,
    date: new Date('Oct 23, 2023'),
    origin: 'AppStore'
  },
  {
    author: {
      name: 'Mmemonic4'
    },
    content: (
      <>
        Lightweight, intuitive, and highly functional. In my experience, it outperforms many other applications I have tried, particularly when it comes to executing the Kanban board and organizing notes in separate folders.
      </>
    ),
    rating: 5,
    date: new Date('Jun 19, 2023'),
    origin: 'AppStore'
  },

  {
    author: {
      name: 'SammyDuck'
    },
    content: (
      <>
        If you like the sharing and security advantages of storing your notes in GitHub repositories, you likely will feel at home in this versatile notetaker/organizer/keeper. From there you can use your notes to feed a public website or blog. For those who prefer iCloud Drive, that option is available as well.
        <br /><br />
        You’ll find yourself quickly and easily setting up a hierarchical folder structure and navigating it by simply tapping oval icons in a horizontal row at the top of your screen. Couldn’t be more intuitive. In that structure you can store almost anything: text, images and photos, names, addresses, phone numbers, geolocations, dates and times, etc. You could even set up a zettelkasten, a knowledge management database in hierarchical form—for business record keeping, research, study, or just personal reference.
        <br /><br />
        The markdown editor is fully featured and included is a primer that you can refer to as you write. Tables, code blocks, html tags, even footnotes are all supported.
        <br /><br />
        What attracted me initially was the kanban board feature. I experimented by setting up an archplot structure “template” for novel plotting using the “Save the Cat” method. I simply brainstorm and add event summaries or setting descriptions or dialogue or whatever in vertical columns below each horizontal plot element. Don’t know how much that will help me yet, but so far I’m pleased with the results.
        <br /><br />
        Lots of potential with this NotesHub app, and the one-time purchase price can’t be beat.
      </>
    ),
    rating: 5,
    date: new Date('Apr 25, 2023'),
    origin: 'AppStore'
  },

  {
    author: {
      name: 'Phrodide',
    },
    content: (
      <>
        I manage a group of volunteers for a non profit and they recently came to me and said they wanted to start blogging on the website. We use Cloudflare and static pages so this meant integrating into the JAMStack. With the GitHub integration this became possible for the non-technical volunteers.
        <br /><br />
        What even better? They can insert pictures and they also upload to GitHub and link properly. Looks right on the website, looks right on this app.
      </>
    ),
    rating: 5,
    date: new Date('Mar 8, 2023'),
    origin: 'AppStore'
  },

  {
    author: {
      name: 'Med Kay',
    },
    content: (
      <>
        This app is great for even text-heavy writing. And it keeps getting better!
      </>
    ),
    rating: 5,
    date: new Date('Mar 3, 2023'),
    origin: 'AppStore'
  },

  // Play Store
  {
    author: {
      name: 'Coroeanu Andrei'
    },
    content: (
      <>
        It works really great. Syncing works flawlessly, and the markdown preview helps a lot in making sure the content is displayed as intended. Even if on web the app is free, I chose to buy it since there's no other app on the market that does this so effortlessly. Kudos to the devs, it's a great job!
      </>
    ),
    rating: 5,
    date: new Date('Oct 2, 2023'),
    origin: 'PlayStore'
  },

  {
    author: {
      name: 'fullmetal chocobo'
    },
    content: (
      <>
        So easy to take simple notes and organize thoughts, I have used this daily for years now. And it is even more useful now with the addition of kanban boards. I ABSOLUTELY LOVE THIS APP!!
      </>
    ),
    rating: 5,
    date: new Date('Apr 23, 2023'),
    origin: 'PlayStore'
  },

  // Windows Store
  {
    author: {
      name: 'Luuk'
    },
    content: (
      <>
        I love the simplicity of this app. All you need is a git repository somewhere (I use GitHub) and you can start writing markdown. No worrying about your data only being available from a single vendor somewhere in the cloud; even if this app would become unavailable, your data is safe. It's not super rich in features, but if you just need markdown support (including images!) and/or simple Kanban it's perfect.
      </>
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
      <>
        Amazing note taking app, with lots of optionality in how you take notes, highlight important parts and add visual aids to your notes.
      </>
    ),
    rating: 5,
    date: new Date('Jun 08, 2023'),
    origin: 'WindowsStore'
  }
];

export default testimonials;

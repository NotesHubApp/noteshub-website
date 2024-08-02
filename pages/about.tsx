import { Layout } from 'components/Layout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    maxWidth: 'var(--max-content-width)',
    padding: '15px 15px',
    margin: '0 auto'
  },
  heading: {
    fontSize: 'var(--heading1-size)',
    display: 'flex',
    justifyContent: 'center'
  },
  article: {
    fontSize: '1.2em',
    lineHeight: 1.7,
  },
  author: {
    textAlign: 'right',
    fontStyle: 'italic',

    '& a': {
      textDecoration: 'underline',

      '&:hover': {
        textDecoration: 'none'
      }
    }
  }
})

export default function About() {
  const classes = useStyles();

  return (
    <Layout
      pageId="about"
      pageTitle="About"
    >
      <div className={ classes.container }>
        <section id="content">
          <h1 className={ classes.heading }>
            About
          </h1>

          <article className={ classes.article }>
            <p>
              I started thinking about ideas behind the <strong>NotesHub</strong> project in the late Fall of 2020.
              At that time I switched multiple note-taking apps.
              I wanted the app with the robust support of Markdown because it allows me easily migrate my data if needed and strictly control formatting.
              On the other hand, I wanted seamless cross-device sync support without a monthly subscription fee and, ideally, fully control my data without being strictly tied to a single particular vendor.
              I have not found any application that would satisfy all my requirements.
              The solution was obvious, create my own.
            </p>
            <p>
              On October 30, 2020, I made the first commit, and 6 months later I pushed the final changes to finalize the MVP version of the project going from the idea to the first stable release.
              The project was finally available to the public.
            </p>
            <p>
              Even though many things changed since then, the main principles remain intact. Simplicity without sacrificing functionality, rich Markdown editing, support of multiple sources for your notes (hence the name <strong>NotesHub</strong>), cross-platform support, and a one-time purchase plan.
            </p>
            <p>
              I hope you will enjoy using <strong>NotesHub</strong> as much as I'm enjoying developing it.
              Let the story continue.
            </p>
            <address className={ classes.author }>
              <a rel="author noopener noreferrer" href="https://twitter.com/al_titarenko" target="_blank">Alex Titarenko</a>
            </address>
          </article>
        </section>
      </div>
    </Layout>
  )
}

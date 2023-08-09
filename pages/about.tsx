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
    fontStyle: 'italic'
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
              I started thinking about the idea of <strong>NotesHub</strong> project in late Fall 2020.
              At that time I switched multiple note-taking apps.
              I wanted the app with the robust support of Markdown because it allows me easily migrate my data if needed and strictly control formatting.
              From another hand, I wanted to avoid paying the monthly subscription fee but have good cross-device sync of data and ideally fully control my data without being strict tight to a single particular vendor.
              I have not found any application that would satisfy all my requirements.
              The solution was obvious, create my own.
            </p>
            <p>
              In October 30, 2020 I made my first commit.
              In the last day before going to vacation in Cancun, I made the final commit to finalize MVP version of the project and ended the 6-month journey from the idea to first stable release. Project was finally available to public.
            </p>
            <p>
              I hope you will enjoy using <strong>NotesHub</strong> as much as I enjoyed creating it.
            </p>
            <address className={ classes.author }>
              - Alex Titarenko
            </address>
          </article>
        </section>
      </div>
    </Layout>
  )
}

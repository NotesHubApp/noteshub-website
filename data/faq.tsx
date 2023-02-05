import { FaqModel } from 'models/FaqModel';


const faq: FaqModel[] = [
  {
    'question': 'Why should I write my notes in Markdown?',
    'answer': (
      <div>
        <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" rel="noopener noreferrer">Markdown</a> is a widely popular open format with support in many applications. By choosing Markdown you can be confident if you decide to switch to a different application you can easily move all of your data without any conversion needed. Also, Markdown is incredibly easy to understand even in raw view as it's just a plain text content with human-readable syntax. Last but not least, Markdown helps you to keep all of your notes in a uniform format, with no more mismatch in font size, font face, etc. when you import data from different sources.
      </div>
    )
  },
  {
    'question': 'What are the benefits of using Git to store notes?',
    'answer': (
      <div>
        You will get a lot of things for free:
        <ul>
          <li>Unlimited version history, and information on when and who did what changes</li>
          <li>Ability to share notebooks with others, you can add anyone as a collaborator or viewer to your Git repository</li>
          <li>Easy self-hosting with plenty open source options, so notes will truly belong to you</li>
          <li>Better merge conflict resolution compare to traditional cloud-based file storage solutions</li>
          <li>Ability to create public websites/blogs from your notebooks</li>
        </ul>
      </div>
    )
  },
  {
    'question': 'Why should I pay for the native NotesHub application if I can use the web version for free?',
    'answer': 'With the native application, you will get more platform-specific features like iCloud Drive support and better integration with the system. Moreover, the web version has a limitation on the size of Git/GitHub notebooks, which is not the case for the native application.'
  }
]

export default faq;

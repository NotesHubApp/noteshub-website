import { FaqModel } from 'models/FaqModel';


const faq: FaqModel[] = [
  {
    'question': 'Why should I pay for the native application if I can use the web application for free?',
    'answer': 'With native apps, you will get more platform-specific features like iCloud Drive support and better integration with the system. Moreover, the web version has a limitation on the size of Git/GitHub notebooks, which is not the case for native apps.'
  },
  {
    'question': 'Why should I write my notes in markdown?',
    'answer': ''
  },
  {
    'question': 'What are the benefits of using Git to store notes?',
    'answer': (
      <div>
        You will get a lot of things for free:
        <ul>
          <li>Unlimited version history</li>
          <li>Ability to share notebooks with others. You can add anyone as a collaborator or viewer to your Git repository</li>
          <li>Easy self-hosting with plenty open source options</li>
          <li>Better merge conflict resolution compare to traditional cloud-based file storage solutions</li>
          <li>Ability to create public websites from your public notebooks</li>
        </ul>
      </div>
    )
  }
]

export default faq;

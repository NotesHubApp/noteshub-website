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
          <li>Free synchronization between devices</li>
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
    'question': 'When and how often does data synchronization occur for Git/GitHub/iCloud Drive notebooks?',
    'answer': (
      <div>
          The first-time synchronization is triggered during the <b>application startup</b> and then occurs <b>every minute</b> thereafter.<br />
          Additionally, <b>any changes</b> to your data will also trigger synchronization (examples: <i>creating/updating a note, deleting a note, moving between folders, moving/creating/deleting a Kanban card, etc</i>).
      </div>
    )
  },
  {
    'question': 'Can I trust NotesHub when connecting my GitHub account?',
    'answer': (
      <div>
        <p>
          With <strong>native NotesHub applications (iOS/macOS/Android/Windows)</strong> we use the <a href="https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow" target="_blank" rel="noopener noreferrer">device auth-flow</a> while connecting your GitHub account. With this type of auth your device receive the auth token directly from GitHub without any interaction with our servers. When data is pulled/pushed from/to GitHub the device is making direct calls without any middle man. In fact, there are no network calls at all to our backend servers, so you can be sure that your account details will not be leaked anywhere or misused. There are variety of ways to check this, the most simple one if you use iPhone go to App Privacy Report/App Network Activity.
        </p>
        <p>
          With the <strong>web version of NotesHub</strong> due to some limitations of GitHub, we have to proxy all network requests through our <a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing" target="_blank" rel="noopener noreferrer">CORS</a> proxy servers.
          In addition, device-auth flow can't be used in the browser and standard <a href="https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow" target="_blank" rel="noopener noreferrer">web application flow</a> is used instead, which will make a call to our backend to generate the auth token. Taking into account those facts, if you have any concerns regarding this matter, we recommend using native NotesHub application for the maximum protection of your data.
        </p>
      </div>
    )
  },
  {
    'question': 'Can I connect only specific GitHub repositories instead of the whole account?',
    'answer': (
      <div>
        <p>
          To accomplish this scenario select generic <strong>Git notebook provider</strong> (instead of GitHub) and for the password field put <a href="https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github" target="_blank" rel="noopener noreferrer">fine-grained personal access token</a> which can be generated to have access only to certain repositories. In terms of permissions set, only <strong>Contents: read and write</strong> is required.
          If you try to use empty pre-created repository from GitHub, make sure to push any file first, this will force GitHub to create a default branch which is a requirement.
        </p>
      </div>
    )
  },
  {
    'question': 'How to self-host notes in Git to use with the app?',
    'answer': (
      <div>
        Follow the steps from our blog post <a href="/blog/archive/2024/1/self-hosting-your-notes-in-git" target="_blank" rel="noopener noreferrer">Self-hosting your notes in Git</a>.
      </div>
    )
  },
  {
    'question': 'Why should I pay for the native NotesHub application if I can use the web version for free?',
    'answer': 'With the native application, you will get more platform-specific features like iCloud Drive support and better integration with the system. Moreover, the web version has a limitation on the size of Git/GitHub notebooks, which is not the case for the native application.'
  }
]

export default faq;

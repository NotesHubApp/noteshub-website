import { BlogRepository, BlogRepositoryConfig } from 'repositories/BlogRepository';

const blogConfig: BlogRepositoryConfig = {
  postsFilePattern: 'data/posts/**/*.md',
  categories: [
    {
      urlSlug: 'release',
      name: 'Press Release'
    }
  ],
  tags: [],
  feed: {
    id: 'https://www.noteshub.app',
    title: 'NotesHub Blog',
    copyright: `${new Date().getFullYear()} TALEX All rights reserved`
  }
}

export const blogRepository = new BlogRepository(blogConfig);

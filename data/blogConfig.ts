import { BlogRepository, BlogRepositoryConfig } from 'repositories/BlogRepository';

const blogConfig: BlogRepositoryConfig = {
  postsFilePattern: 'data/posts/**/*.md',
  categories: [
    {
      urlSlug: 'release',
      name: 'Press Release'
    }
  ],
  tags: []
}

export const blogRepository = new BlogRepository(blogConfig);

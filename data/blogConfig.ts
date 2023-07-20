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
    id: process.env.NEXT_PUBLIC_LANDING_PAGE_URL!,
    title: `${process.env.NEXT_PUBLIC_APPNAME} Blog`,
    description: `The latest news about ${process.env.NEXT_PUBLIC_APPNAME} app`,
    link: `${process.env.NEXT_PUBLIC_LANDING_PAGE_URL!}/blog`,
    copyright: `${new Date().getFullYear()} TALEX All rights reserved`,
    language: 'en-US'
  }
}

export const blogRepository = new BlogRepository(blogConfig);

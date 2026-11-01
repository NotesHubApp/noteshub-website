import * as env from 'utils/env';

import { BlogRepository, BlogRepositoryConfig } from 'repositories/BlogRepository';

import { Routes } from 'utils/Routes';

const blogConfig: BlogRepositoryConfig = {
  postsFilePattern: 'data/posts/**/*.md',
  assetsFilePattern: 'data/posts/**/.attachments/*',
  assetsDestination: 'public/posts/attachments',
  assetsUrlTransformer: (rawContent: string) => {
    return rawContent.replaceAll('.attachments/', '/posts/attachments/');
  },
  categories: [
    {
      urlSlug: 'release',
      name: 'Press Release'
    }
  ],
  tags: [],
  feed: {
    origin: env.baseUrl,
    title: `${process.env.NEXT_PUBLIC_APPNAME} Blog`,
    description: `The latest news about ${process.env.NEXT_PUBLIC_APPNAME} app`,
    copyright: `${new Date().getFullYear()} TALEX All rights reserved`,
    language: 'en-US',
    postUrlGenerator: (post) => Routes.blogPost(post, true)
  }
}



export const blogRepository = new BlogRepository(blogConfig);

import * as env from 'utils/env';

import { BlogPostAnnotation } from 'models/BlogPost';

// The link preview size recommended by both Facebook and LinkedIn.
export const socialImageSize = { width: 1200, height: 630 };

export class Routes {
  public static blogPost(post: BlogPostAnnotation, absolute: boolean = false) {
    const postedOn = new Date(post.postedOn);
    const baseUrl = absolute ? `${env.baseUrl}/` : ''
    return `${baseUrl}blog/archive/${postedOn.getFullYear()}/${postedOn.getMonth() + 1}/${post.urlSlug}`
  }

  // LinkedIn doesn't render WebP link previews, so a post's own WebP hero image gets a JPG copy at build time.
  public static socialImage(image?: string) {
    return image?.replace(/^(\/.*)\.webp$/i, '$1.jpg');
  }
}

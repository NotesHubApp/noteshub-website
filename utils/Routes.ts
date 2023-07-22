import * as env from 'utils/env';

import { BlogPostAnnotation } from 'models/BlogPost';

export class Routes {
  public static blogPost(post: BlogPostAnnotation, absolute: boolean = false) {
    const postedOn = new Date(post.postedOn);
    const baseUrl = absolute ? `${env.baseUrl}/` : ''
    return `${baseUrl}blog/archive/${postedOn.getFullYear()}/${postedOn.getMonth()}/${post.urlSlug}`
  }
}

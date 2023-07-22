import { BlogPostAnnotation } from 'models/BlogPost';

export class Routes {
  public static blogPost(post: BlogPostAnnotation, absolute: boolean = false) {
    const postedOn = new Date(post.postedOn);
    const baseUrl = absolute ? `${process.env.NEXT_PUBLIC_LANDING_PAGE_URL!}/` : ''
    return `${baseUrl}blog/archive/${postedOn.getFullYear()}/${postedOn.getMonth()}/${post.urlSlug}`
  }
}

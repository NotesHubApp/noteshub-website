import { Announcement } from 'models/Announcement'
import { Routes } from 'utils/Routes';
import { blogRepository } from './blogConfig';

const latestPost = blogRepository.getLatestPublishedPostAnnotation();
const postAnnouncement: Announcement | undefined = latestPost ? {
  type: 'post',
  title: latestPost.title,
  url: Routes.blogPost(latestPost)
} : undefined

const productHuntAnnouncement: Announcement = {
  type: 'productHunt',
  postId: '451685',
  postSlug: 'noteshub-3-3'
}

export default postAnnouncement

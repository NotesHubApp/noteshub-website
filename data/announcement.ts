import { Announcement } from 'models/Announcement'
import { Routes } from 'utils/Routes';
import { blogRepository } from './blogConfig';

const latestPost = blogRepository.getLatestPublishedPost();
const postAnnouncement: Announcement | undefined = latestPost ? {
  type: 'post',
  title: latestPost.title,
  url: Routes.blogPost(latestPost)
} : undefined

const productHuntAnnouncement: Announcement = {
  type: 'productHunt',
  postId: '378905',
  postSlug: 'noteshub-2-x'
}

export default postAnnouncement

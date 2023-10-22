export type PostAnnouncement = {
  type: 'post'
  title: string
  url: string
}

export type ProductHuntAnnouncement = {
  type: 'productHunt'
  postId: string
  postSlug: string
}

export type Announcement =
  | PostAnnouncement
  | ProductHuntAnnouncement

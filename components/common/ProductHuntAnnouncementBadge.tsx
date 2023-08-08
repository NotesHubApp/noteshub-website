type ProductHuntAnnouncementBadgeProps = {
  postId: string
}

export function ProductHuntAnnouncementBadge(props: ProductHuntAnnouncementBadgeProps) {


  return (
    <a href="https://www.producthunt.com/posts/noteshub-2-x" target="_blank">
      <img
        src={ `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${props.postId}&theme=neutral` }
        alt="Product Hunt Announcement Badge"
        width="250"
        height="54"
      />
    </a>
  )
}

import { useColorScheme } from 'hooks/useColorScheme'

type ProductHuntAnnouncementBadgeProps = {
  postId: string
  postSlug: string
}

export function ProductHuntAnnouncementBadge(props: ProductHuntAnnouncementBadgeProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? 'neutral' : 'dark';
  const imgSrc = `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${props.postId}&theme=${theme}`;

  return (
    <a href={ `https://www.producthunt.com/posts/${props.postSlug}` } target="_blank">
      <img
        src={ imgSrc }
        alt="Product Hunt announcement badge"
        width="250"
        height="54"
        style={{ opacity: colorScheme ? 1 : 0 }}
      />
    </a>
  )
}

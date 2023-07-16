import { BlogPost } from 'models/BlogPost'
import { Layout } from 'components/Layout'

export default function BlogPostPage(props: BlogPost) {
  return (
    <Layout
      pageId="blog"
      pageTitle={ `${props.title} - Blog` }
      mediaTitle={ props.title }
      description={ props.description }
      imageUrl={ getImageUrl(props.image) }
    >

    </Layout>
  )
}

function getImageUrl(image?: string) {
  if (!image) {
    return undefined;
  }

  if (/^http(s)?:/i.test(image)) {
    return image;
  }

  return new URL(
    image.startsWith('/') ? `/posts${image}` : `/posts/${image}`,
    process.env.NEXT_PUBLIC_LANDING_PAGE_URL
  ).href;
}

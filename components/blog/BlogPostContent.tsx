import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { remarkFigureCaption } from 'components/remarkPlugins/remarkFigureCaption'
import remarkGfm from 'remark-gfm'

type BlogPostContentProps = {
  urlSlug: string;
  markdownContent: string
}

function isExternalUrl(url: string) {
  return /^http(s)?:/i.test(url);
}

const components = {
  img: (props: any) => (
    <img
      className="img-responsive"
      src={ props.src }
      srcSet={ `${props.src} 1x, ${props.src} 2x` }
      alt={ props.alt }
      title={ props.title }
    />
  ),
  table: (props: any) => (<table className="table">{ props.children }</table>),
  a: (props: any) => (
    <a href={props.href} {...(isExternalUrl(props.href) ? { target: '_blank', rel: 'nofollow' } : {}) }>
      { props.children }
    </a>
  )
};

export default function BlogPostContent(props: BlogPostContentProps) {
  return (
    <ReactMarkdown
      className='blog-post-content'
      children={props.markdownContent}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[
        [remarkGfm, { singleTilde: false }],
        remarkFigureCaption
      ]}
      components={ components }
    />
  );
}

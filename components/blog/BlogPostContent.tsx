import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

type BlogPostContentProps = {
  urlSlug: string;
  markdownContent: string
}

function isExternalUrl(url: string) {
  return /^http(s)?:/i.test(url);
}

const components = {
  img: (props: any) => (<img className="img-responsive" src={props.src} alt={props.alt} />),
  table: (props: any) => (<table className="table">{ props.children }</table>),
  a: (props: any) => (
    <a href={props.href} {...(isExternalUrl(props.href) ? { target: '_blank', rel: 'nofollow' } : {}) }>
      { props.children }
    </a>
  ),
  // code: (props: any) => (
  //   <pre className={`language-${props.language}`}>
  //     <code className={`language-${props.language}`}>{ props.value }</code>
  //   </pre>
  // )
};

export default function BlogPostContent(props: BlogPostContentProps) {
  function transformInternalUri(uri: string): string {
    if (!isExternalUrl(uri)) {
      return uri.startsWith('/') ? `/posts${uri}` : `/posts/${uri}`;
    }
    return uri;
  }

  return (
    <ReactMarkdown
      className='blog-post-content'
      children={props.markdownContent}
      transformImageUri={(uri) => transformInternalUri(uri) }
      transformLinkUri={(uri) => transformInternalUri(uri) }
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={ components }
    />
  );
}

import { PropsWithChildren } from 'react';

type ExternalLinkProps = {
  href?: string
  title?: string
  className?: string
}

export function ExternalLink(props: PropsWithChildren<ExternalLinkProps>) {
  return (
    <a
      href={ props.href }
      title={ props.title }
      className={ props.className }
      target="_blank"
      rel="noopener noreferrer"
    >
      { props.children }
    </a>
  )
}

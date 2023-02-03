import { PropsWithChildren } from 'react';

type ExternalLinkProps = {
  href?: string
}

export function ExternalLink(props: PropsWithChildren<ExternalLinkProps>) {
  return (
    <a
      href={ props.href }
      target="_blank"
      rel="noopener noreferrer"
    >
      { props.children }
    </a>
  )
}

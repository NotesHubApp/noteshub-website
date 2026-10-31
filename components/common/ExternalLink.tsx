import { PropsWithChildren } from 'react';

type ExternalLinkProps = {
  href?: string
  title?: string
  className?: string
}

export function ExternalLink({ children, ...rest }: PropsWithChildren<ExternalLinkProps>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      { ...rest }
    >
      { children }
    </a>
  )
}

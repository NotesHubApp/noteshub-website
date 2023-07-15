import { PropsWithChildren } from 'react'

type LayoutProps = {

}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <div>
      { props.children }
    </div>
  )
}

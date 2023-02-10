import { ReactNode } from 'react'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return <div className="layout">{children}</div>
}

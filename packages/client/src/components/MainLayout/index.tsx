import React, { ReactNode } from 'react'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
}

export class MainLayout extends React.Component<MainLayoutProps> {
  render() {
    return <div className="layout">{this.props.children}</div>
  }
}

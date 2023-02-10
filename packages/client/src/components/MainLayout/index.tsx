import React, { Component, ReactNode } from 'react'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
}

export class MainLayout extends Component<MainLayoutProps> {
  render() {
    return <div className="layout">{this.props.children}</div>
  }
}

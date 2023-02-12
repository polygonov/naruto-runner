import React, { ReactNode } from 'react'
import HeaderComponent from '../Header'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
}

export class MainLayout extends React.Component<MainLayoutProps> {

  render() {
    return (
      <div className="layout">
        <HeaderComponent />
        {this.props.children}
      </div>
    )
  }
}

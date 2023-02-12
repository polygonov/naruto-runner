import React, { Component, ReactNode } from 'react'
import HeaderComponent from '../Header'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
  background: string
}

export class MainLayout extends Component<MainLayoutProps> {
  imageNames: { [key: string]: string } = {
    '/': 'Main',
    '/forum': 'Main',
    '/login': 'Login',
    '/leaderboard': 'Leaderboard',
    '/profile': 'Profile',
  }
  getBackgroundImgPath() {
    return `src/assets/images/background/${this.imageNames[this.props.background]}.png`
  }
  render() {
    return (
      <div
        className="layout"
        style={{
          backgroundImage: `url(${this.getBackgroundImgPath()})`,
        }}>
        <div className="main-wrapper">
          <HeaderComponent />
          <div className="content-wrapper">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

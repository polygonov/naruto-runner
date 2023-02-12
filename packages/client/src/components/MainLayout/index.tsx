import React, { Component, ReactNode } from 'react'
import HeaderComponent from '../Header'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
  background: string
}

export class MainLayout extends Component<MainLayoutProps> {
  getImageName(): string {
    let imgName = 'Main'
    switch (this.props.background) {
      case '/':
        imgName = 'Main'
        break
      case '/forum':
        imgName = 'Main'
        break
      case '/login':
        imgName = 'Login'
        break
      case '/leaderboard':
        imgName = 'Leaderboard'
        break
      case '/profile':
        imgName = 'Profile'
        break
    }
    return imgName
  }
  getBackgroundImgPath() {
    return `src/assets/images/background/${this.getImageName()}.png`
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

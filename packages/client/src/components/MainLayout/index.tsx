import { Component, ReactNode } from 'react'
import HeaderComponent from '../Header'
import { RoutesNameList } from '../../constant'
import mainBack from '../../assets/images/background/Main.png'
import profileBack from '../../assets/images/background/Profile.png'
import loginBack from '../../assets/images/background/Login.png'
import leaderboardBack from '../../assets/images/background/Leaderboard.png'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
  background: string
}

export class MainLayout extends Component<MainLayoutProps> {
  imageNames: { [key: string]: string } = {
    [RoutesNameList.Main]: mainBack,
    [RoutesNameList.Forum]: mainBack,
    [RoutesNameList.Login]: loginBack,
    [RoutesNameList.Leaderboard]: leaderboardBack,
    [RoutesNameList.Profile]: profileBack,
  }
  getBackgroundImgPath(): string {
    return this.imageNames[this.props.background]
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

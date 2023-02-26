import { Component, ReactNode } from 'react'
import HeaderComponent from '../Header'
import { RoutesNameList } from '../../constant'
import mainBack from '../../assets/images/background/Main.png'
import mainBack2x from '../../assets/images/background/Main@2x.png'
import profileBack from '../../assets/images/background/Profile.png'
import profileBack2x from '../../assets/images/background/Profile@2x.png'
import loginBack from '../../assets/images/background/Login.png'
import loginBack2x from '../../assets/images/background/Login@2x.png'
import leaderboardBack from '../../assets/images/background/Leaderboard.png'
import leaderboardBack2x from '../../assets/images/background/Leaderboard@2x.png'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
  background: string
}

export class MainLayout extends Component<
  MainLayoutProps,
  { backGroundImage: string; backGroundImage2x: string; pageName: string }
> {
  imageNames: { [key: string]: string } = {
    [RoutesNameList.Main]: mainBack,
    [RoutesNameList.Login]: loginBack,
    [RoutesNameList.Leaderboard]: leaderboardBack,
    [RoutesNameList.Profile]: profileBack,
  }
  imageNames2x: { [key: string]: string } = {
    [RoutesNameList.Main]: mainBack2x,
    [RoutesNameList.Login]: loginBack2x,
    [RoutesNameList.Leaderboard]: leaderboardBack2x,
    [RoutesNameList.Profile]: profileBack2x,
  }
  constructor(props: MainLayoutProps) {
    super(props)
    this.state = {
      backGroundImage: '',
      backGroundImage2x: '',
      pageName: this.props.background,
    }
  }

  getBackgroundImgPath(image: string) {
    this.setState({
      backGroundImage: this.imageNames[image],
      backGroundImage2x: this.imageNames2x[image],
    })
  }

  componentDidMount() {
    this.getBackgroundImgPath(this.props.background)
  }

  componentWillReceiveProps(nextProps: { background: string }) {
    this.getBackgroundImgPath(nextProps.background)
  }

  render() {
    return (
      <div className="layout">
        {this.state.backGroundImage && (
          <div className="layout__background-image">
            <img
              src={this.state.backGroundImage}
              srcSet={`${this.state.backGroundImage2x} 2x`}
            />
          </div>
        )}
        <div className="main-wrapper">
          <HeaderComponent />
          <div className="content-wrapper">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

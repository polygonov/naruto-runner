import { FC, ReactNode, useEffect, useState } from 'react'
import HeaderComponent from '../Header'
import { RoutesNameList } from '../../constant'
import mainBack from './background/Main.png'
import mainBack2x from './background/Main@2x.png'
import profileBack from './background/Profile.png'
import profileBack2x from './background/Profile@2x.png'
import loginBack from './background/Login.png'
import loginBack2x from './background/Login@2x.png'
import leaderboardBack from './background/Leaderboard.png'
import leaderboardBack2x from './background/Leaderboard@2x.png'
import gameBack from '../../assets/images/background/Game.png'
import ErrorBoundary from '../ErrorBoundary'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
  pageName: string
}

const imageNames: { [key: string]: string } = {
  [RoutesNameList.Main]: mainBack,
  [RoutesNameList.Login]: loginBack,
  [RoutesNameList.Registration]: loginBack,
  [RoutesNameList.Leaderboard]: leaderboardBack,
  [RoutesNameList.Profile]: profileBack,
  [RoutesNameList.Game]: gameBack,
}

const imageNames2x: { [key: string]: string } = {
  [RoutesNameList.Main]: mainBack2x,
  [RoutesNameList.Login]: loginBack2x,
  [RoutesNameList.Leaderboard]: leaderboardBack2x,
  [RoutesNameList.Profile]: profileBack2x,
}

export const MainLayout: FC<MainLayoutProps> = ({ pageName, ...props }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>(
    imageNames[pageName]
  )
  const [backgroundImage2x, setBackgroundImage2x] = useState<string>(
    imageNames2x[pageName]
  )

  useEffect(() => {
    setBackgroundImage(imageNames[pageName])
    setBackgroundImage2x(imageNames2x[pageName])
  }, [pageName])

  return (
    <div
      className={
        pageName === RoutesNameList.Main ? 'layout layout_main' : 'layout'
      }>
      {backgroundImage && (
        <div className="layout__background-image">
          <img src={backgroundImage} srcSet={`${backgroundImage2x} 2x`} />
        </div>
      )}
      <ErrorBoundary>
        <div className="main-wrapper">
          <HeaderComponent />
          <div
            className={`content-wrapper ${
              backgroundImage ? '' : 'content-wrapper--fullscreen'
            }`}>
            {props.children}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  )
}

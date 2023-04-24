import { Route, Routes, useLocation } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { Game } from './pages/Game'
import { Authorization } from './router/Authorization'
import { MainPage } from './pages/Main'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { Profile } from './pages/Profile'
import { Leaderboard } from './pages/Leaderboard'
import { NotFound } from './pages/NotFound'
import { Forum } from './pages/Forum'
import { RoutesNameList } from './constant'
import { Topic } from './pages/Topic'
import { hot } from 'react-hot-loader/root'

import './App.css'
import { useEffect } from 'react'

const App: React.FC = hot(() => {
  const { pathname } = useLocation()
  return (
    <MainLayout background={pathname}>
      <Routes>
        <Route element={<Authorization />}>
          <Route path={RoutesNameList.Login} element={<Login />} />
          <Route
            path={RoutesNameList.Registration}
            element={<Registration />}
          />
        </Route>

        <Route element={<Authorization requireAuth />}>
          <Route path={RoutesNameList.Profile} element={<Profile />} />
          <Route path={RoutesNameList.Leaderboard} element={<Leaderboard />} />
        </Route>

        <Route path={RoutesNameList.Main} element={<MainPage />} />
        <Route path={RoutesNameList.Forum} element={<Forum />} />
        <Route path={RoutesNameList.Topic} element={<Topic />} />
        <Route path={RoutesNameList.Game} element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  )
})

export default App

import { Logo } from '../../components/Logo'
import { Link } from '../../components/Link/index'
import './index.css'
import { RoutesNameList } from '../../constant'

export function MainPage() {
  const isAuth = false

  return (
    <div className="main-page-wrapper">
      <Logo />
      <div className="button-wrapper">
        <Link href={RoutesNameList.Game} text="Начать игру" view="primary" />
        {!isAuth && (
          <Link href={RoutesNameList.Login} text="Войти" view="secondary" />
        )}
      </div>
    </div>
  )
}

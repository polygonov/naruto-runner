import { Logo } from '../../components/Logo'
import { Link } from '../../components/Link/index'
import './index.css'
import { RoutesNameList } from '../../constant'
import randomClickSound from '../../utils/randomClickSound'

export function MainPage() {
  const isAuth = false

  return (
    <div className="main-page-wrapper">
      <Logo />
      <div className="button-wrapper">
        <Link
          href={RoutesNameList.Game}
          text="Начать игру"
          view="primary"
          onClick={randomClickSound}
          withSound={true}
        />
        {!isAuth && (
          <Link
            href={RoutesNameList.Login}
            text="Войти"
            view="secondary"
            onClick={randomClickSound}
            withSound={true}
          />
        )}
      </div>
    </div>
  )
}

import { Logo } from '../../../components/Logo'
import { Button } from '../../../components/Button'
import './Main.css'

export function Main() {
  const isAuth = true
  const text = isAuth ? 'Начать игру' : 'Войти'
  return (
    <div className="main-page-wrapper">
      <Logo />
      <Button text={text} />
    </div>
  )
}

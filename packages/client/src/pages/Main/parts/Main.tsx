import { Logo } from '../../../components/Logo'
import { Button } from '../../../components/Button'
import './Main.css'
import { useNavigate } from 'react-router-dom'

export function Main() {
  const isAuth = false
  const navigate = useNavigate()

  const moveToLoginPage = () => {
    navigate('/login')
  }
  const startGame = () => {
    console.log('start the Game')
  }
  const button = !isAuth ? (
    <Button text="Войти" onClick={moveToLoginPage} view="secondary" />
  ) : undefined
  return (
    <div className="main-page-wrapper">
      <Logo />
      <div className="button-wrapper">
        <Button text="Начать игру" onClick={startGame} />
        {button}
      </div>
    </div>
  )
}

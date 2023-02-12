import { Logo } from '../../../components/Logo'
import { Button } from '../../../components/Button'
import './Main.css'
import { useNavigate } from 'react-router-dom'

export function Main() {
  const isAuth = false
  const text = isAuth ? 'Начать игру' : 'Войти'
  const navigate = useNavigate()

  const moveToLoginPage = () => {
    navigate('/login')
  }
  const startGame = () => {
    console.log('start the Game')
  }
  return (
    <div className="main-page-wrapper">
      <Logo />
      <Button text={text} onClick={isAuth ? startGame : moveToLoginPage} />
    </div>
  )
}

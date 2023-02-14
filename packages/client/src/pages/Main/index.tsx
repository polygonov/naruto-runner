import { Logo } from '../../components/Logo'
import { Button } from '../../components/Button'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { RoutesNameList } from '../../constant'
import { useCallback } from 'react'

export function MainPage() {
  const isAuth = false
  const navigate = useNavigate()

  const moveToLoginPage = useCallback(() => {
    navigate(RoutesNameList.Login)
  }, [RoutesNameList.Login])
  
  const startGame = () => {
    console.log('start the Game')
  }
  return (
    <div className="main-page-wrapper">
      <Logo />
      <div className="button-wrapper">
        <Button text="Начать игру" onClick={startGame} />
        {!isAuth && (
          <Button text="Войти" onClick={moveToLoginPage} view="secondary" />
        )}
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RegistrationForm } from '../../components/forms/Registration'
import { useAuth } from '../../hooks/useAuth'
import { RoutesNameList } from '../../constant'

export function Registration() {
  const navigate = useNavigate()
  const { isAuth, handleRegister } = useAuth()

  useEffect(() => {
    if (isAuth) {
      navigate(RoutesNameList.Profile)
    }
  }, [isAuth])

  return <RegistrationForm handleRegister={handleRegister} />
}

import { RegistrationForm } from '../../components/forms/Registration'
import { useAuth } from '../../hooks/useAuth'

export function Registration() {
  const { authError, handleRegister } = useAuth()

  return (
    <RegistrationForm serverError={authError} handleRegister={handleRegister} />
  )
}

import { RegistrationForm } from '../../components/forms/Registration'
import { useAuth } from '../../hooks/useAuth'

export function Registration() {
  const { handleRegister } = useAuth()

  return <RegistrationForm handleRegister={handleRegister} />
}

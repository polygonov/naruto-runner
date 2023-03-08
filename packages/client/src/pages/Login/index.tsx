import { LoginForm } from '../../components/forms/Login'
import { useAuth } from '../../hooks/useAuth'

export function Login() {
  const { authError, handleAuth } = useAuth()

  return (
    <LoginForm serverError={authError} handleAuth={handleAuth} />
  )
}

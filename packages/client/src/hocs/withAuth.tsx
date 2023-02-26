import { ReactElement, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const withAuth = (Component: () => ReactElement) => () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth().finally(() => setIsCheckingAuth(false))
  }, [])

  if (isCheckingAuth) {
    // TODO показать прелоадер
    return <p>Загрузка...</p>
  }

  return <Component />
}

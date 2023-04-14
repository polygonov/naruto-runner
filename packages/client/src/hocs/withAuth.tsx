import { FC, ReactElement, useLayoutEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export const withAuth = (Component: () => ReactElement) => () => {
  const { checkAuthorization, isCheckingAuth } = useAuth()

  useLayoutEffect(() => {
    checkAuthorization()
  }, [])

  if (isCheckingAuth) {
    // TODO показать прелоадер
    return <p>Загрузка...</p>
  }

  return <Component />
}

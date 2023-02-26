import type { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RoutesNameList } from '../constant'
import { useAppSelector } from '../store'
import { selectIsAuth } from '../store/auth/selectors'

type AuthorizationProps = {
  requireAuth?: boolean
  requireUnAuth?: boolean
}

export const Authorization: FC<AuthorizationProps> = ({
  requireAuth,
  requireUnAuth,
}) => {
  const isAuth = useAppSelector(selectIsAuth)

  if (requireUnAuth && isAuth) {
    return <Navigate to={RoutesNameList.Profile} />
  }

  if (requireAuth && !isAuth) {
    return <Navigate to={RoutesNameList.Login} />
  }

  return <Outlet />
}

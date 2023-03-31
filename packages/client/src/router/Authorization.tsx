import type { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store'
import { selectIsAuth } from '../store/auth/selectors'
import { RoutesNameList } from '../constant'

type AuthorizationProps = {
  requireAuth?: boolean
}

export const Authorization: FC<AuthorizationProps> = ({ requireAuth }) => {
  const isAuth = useAppSelector(selectIsAuth)

  if (!requireAuth && isAuth) {
    return <Navigate to={RoutesNameList.Profile} />
  }

  if (requireAuth && !isAuth) {
    return <Navigate to={RoutesNameList.Login} />
  }

  return <Outlet />
}

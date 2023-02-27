import { useCallback } from 'react'
import type { RegisterPayload } from '../api/auth/types'
import { useAppDispatch, useAppSelector } from '../store'
import {
  selectAuthError,
  selectIsAuth,
  selectIsCheckingAuth,
} from '../store/auth/selectors'
import { checkAuth, signUp } from '../store/auth/thunk'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const isCheckingAuth = useAppSelector(selectIsCheckingAuth)
  const authError = useAppSelector(selectAuthError)

  const checkAuthorization = useCallback(async () => {
    dispatch(checkAuth())
  }, [dispatch])

  const handleRegister = useCallback(
    (data: RegisterPayload) => {
      dispatch(signUp(data))
    },
    [dispatch]
  )

  return {
    isAuth,
    isCheckingAuth,
    authError,
    handleRegister,
    checkAuthorization,
  }
}

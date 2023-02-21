import type { RegisterPayload } from '../api/auth/types'
import { useAppDispatch, useAppSelector } from '../store'
import { selectIsAuth } from '../store/auth/selectors'
import { getUser, signUp } from '../store/auth/thunk'
import { useCallback } from 'react'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  const handleRegister = useCallback(
    async (data: RegisterPayload) => {
      await dispatch(signUp(data)).unwrap()
      await dispatch(getUser()).unwrap()
    },
    [dispatch]
  )

  return {
    isAuth,
    handleRegister,
  }
}

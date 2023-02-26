import { useCallback } from 'react'
import type { RegisterPayload } from '../api/auth/types'
import { useAppDispatch, useAppSelector } from '../store'
import { selectIsAuth } from '../store/auth/selectors'
import { signUp } from '../store/auth/thunk'
import { setIsAuth } from '../store/auth/slice'
import { getUser } from '../store/user/thunk'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  const checkAuth = useCallback(async () => {
    await dispatch(getUser()).unwrap()
    await dispatch(setIsAuth(true))
  }, [dispatch])

  const handleRegister = useCallback(
    async (data: RegisterPayload) => {
      await dispatch(signUp(data)).unwrap()
      await checkAuth()
    },
    [dispatch]
  )

  return {
    isAuth,
    handleRegister,
    checkAuth,
  }
}

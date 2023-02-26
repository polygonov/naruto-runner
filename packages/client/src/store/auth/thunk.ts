import { createThunk } from '../utils/createThunk'
import { authApi } from '../../api/auth'
import type { RegisterPayload, RegisterResponse } from '../../api/auth/types'

export const signUp = createThunk<RegisterPayload, RegisterResponse>(
  'auth/sign-up',
  (payload: RegisterPayload) => authApi.signUp(payload)
)

export const signIn = createThunk('auth/sign-in', async () => {
  // TODO сделать запрос
})

export const logout = createThunk('auth/logout', async () => {
  // TODO сделать запрос
})

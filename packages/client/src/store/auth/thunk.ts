import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/auth'
import type { AuthPayload, RegisterPayload } from '../../api/auth/types'
import { setUser, setTheme, resetUserState } from '../user/slice'

export const checkAuth = createAsyncThunk(
  'auth/check-auth',
  async (_, { dispatch }) => {
    const user = await authApi.getUser()
    dispatch(setUser(user))
    dispatch(setTheme(user.isDarkMode))
  }
)

export const signUp = createAsyncThunk(
  'auth/sign-up',
  async (payload: RegisterPayload, { dispatch }) => {
    await authApi.signUp(payload)
    const user = await authApi.getUser()
    dispatch(setUser(user))
    dispatch(setTheme(user.isDarkMode))
  }
)

export const signIn = createAsyncThunk(
  'auth/sign-in',
  async (payload: AuthPayload, { dispatch }) => {
    await authApi.signIn(payload)
    const user = await authApi.getUser()
    dispatch(setUser(user))
    dispatch(setTheme(user.isDarkMode))
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (payload, { dispatch }) => {
    await authApi.logout()
    dispatch(resetUserState())
  }
)

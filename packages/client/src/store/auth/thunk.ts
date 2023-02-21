import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/auth'
import type { RegisterPayload } from '../../api/auth/types'
import type { ApiErrorResponse } from '../../api/types'
import { setUser } from '../user/slice'

export const signUp = createAsyncThunk(
  'auth/sign-up',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const result = await authApi.signUp(payload)
      return result
    } catch (err) {
      return rejectWithValue((err as ApiErrorResponse).reason)
    }
  }
)

export const signIn = createAsyncThunk(
  'auth/sign-in',
  async (_, { rejectWithValue }) => {
    try {
      // TODO сделать запрос
    } catch (err) {
      return rejectWithValue((err as ApiErrorResponse).reason)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // TODO сделать запрос
    } catch (err) {
      return rejectWithValue((err as ApiErrorResponse).reason)
    }
  }
)

export const getUser = createAsyncThunk(
  'auth/get-user',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authApi.getUser()
      setUser(user)
    } catch (err) {
      return rejectWithValue((err as ApiErrorResponse).reason)
    }
  }
)

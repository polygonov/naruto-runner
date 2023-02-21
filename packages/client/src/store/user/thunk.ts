import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/auth'
import type { ApiErrorResponse } from '../../api/types'

export const getUser = createAsyncThunk(
  'user/get-user',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authApi.getUser()
      return user
    } catch (err) {
      return rejectWithValue((err as ApiErrorResponse).reason)
    }
  }
)

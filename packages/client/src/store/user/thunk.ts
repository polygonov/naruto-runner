import { createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from '../../api/user'
import type {
  ChangeAvatarPayload,
  ChangePasswordPayload,
  ChangeUserPayload,
} from '../../api/user/types'

export const changeUserData = createAsyncThunk(
  'user/change-user-data',
  async (payload: ChangeUserPayload) => {
    const user = await userApi.changeUserData(payload)
    return user
  }
)

export const changeUserAvatar = createAsyncThunk(
  'user/change-user-avatar',
  async (payload: ChangeAvatarPayload) => {
    const user = await userApi.changeUserAvatar(payload)
    return user
  }
)

export const changeUserPassword = createAsyncThunk(
  'user/change-user-password',
  async (payload: ChangePasswordPayload) => {
    await userApi.changePassword(payload)
  }
)

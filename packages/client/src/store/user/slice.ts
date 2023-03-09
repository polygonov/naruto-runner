import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { changeUserAvatar, changeUserData, changeUserPassword } from './thunk'
import { GENERAL_ERROR } from '../../constant'
import type { User } from '../../api/user/types'
import { updateResourcePath } from '../../utils/updateResourcePath'

export type UserState = {
  user: User | null
  isUserLoading: boolean
  isAvatarLoading: boolean
  isUserSuccess: boolean
  isAvatarSuccess: boolean
  userError: string | null
  avatarError: string | null
}

const initialState: UserState = {
  user: null,
  isUserLoading: false,
  isAvatarLoading: false,
  isUserSuccess: false,
  isAvatarSuccess: false,
  userError: null,
  avatarError: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = {
        ...payload,
        avatar: updateResourcePath(payload.avatar),
      }
    },
    resetErrorsAndStatuses: state => {
      state.isUserLoading = false
      state.isAvatarLoading = false
      state.isUserSuccess = false
      state.isAvatarSuccess = false
      state.userError = null
      state.avatarError = null
    },
    resetUserState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(changeUserAvatar.pending, state => {
      state.isAvatarLoading = true
      state.isAvatarSuccess = false
      state.avatarError = null
    })
    builder.addCase(changeUserAvatar.fulfilled, state => {
      state.isAvatarLoading = false
      state.isAvatarSuccess = true
      state.avatarError = null
    })
    builder.addCase(changeUserAvatar.rejected, (state, { error }) => {
      state.isAvatarLoading = false
      state.isAvatarSuccess = false
      state.avatarError = error.message ?? GENERAL_ERROR
    })
    builder.addMatcher(isPending(changeUserData, changeUserPassword), state => {
      state.isUserLoading = true
      state.isUserSuccess = false
      state.userError = null
    })
    builder.addMatcher(
      isFulfilled(changeUserData, changeUserAvatar),
      (state, { payload }) => {
        state.user = {
          ...payload,
          avatar: updateResourcePath(payload.avatar),
        }
      }
    )
    builder.addMatcher(
      isFulfilled(changeUserData, changeUserPassword),
      state => {
        state.isUserLoading = false
        state.isUserSuccess = true
        state.userError = null
      }
    )
    builder.addMatcher(
      isRejected(changeUserData, changeUserPassword),
      (state, { error }) => {
        state.isUserLoading = false
        state.isUserSuccess = false
        state.userError = error.message ?? GENERAL_ERROR
      }
    )
  },
})

export const { setUser, resetErrorsAndStatuses } = userSlice.actions

export default userSlice.reducer

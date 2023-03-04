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
  loading: boolean
  avatarLoading: boolean
  success: boolean
  avatarSuccess: boolean
  error: string | null
  avatarError: string | null
}

const initialState: UserState = {
  user: null,
  loading: false,
  avatarLoading: false,
  success: false,
  avatarSuccess: false,
  error: null,
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
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    resetErrorsAndStatuses: state => {
      state.loading = false
      state.avatarLoading = false
      state.success = false
      state.avatarSuccess = false
      state.error = null
      state.avatarError = null
    },
    resetUserState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(changeUserAvatar.pending, state => {
      state.avatarLoading = true
      state.avatarSuccess = false
      state.avatarError = null
    })
    builder.addCase(changeUserAvatar.fulfilled, state => {
      state.avatarLoading = false
      state.avatarSuccess = true
      state.avatarError = null
    })
    builder.addCase(changeUserAvatar.rejected, (state, { error }) => {
      state.avatarLoading = false
      state.avatarSuccess = false
      state.avatarError = error.message ?? GENERAL_ERROR
    })
    builder.addMatcher(isPending(changeUserData, changeUserPassword), state => {
      state.loading = true
      state.success = false
      state.error = null
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
        state.loading = false
        state.success = true
        state.error = null
      }
    )
    builder.addMatcher(
      isRejected(changeUserData, changeUserPassword),
      (state, { error }) => {
        state.loading = false
        state.success = false
        state.error = error.message ?? GENERAL_ERROR
      }
    )
  },
})

export const { setUser, resetErrorsAndStatuses } = userSlice.actions

export default userSlice.reducer

import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import type { User } from '../../api/user/types'
import { getUser } from './thunk'

export type UserState = {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload
    })
    builder.addMatcher(isPending(getUser), state => {
      state.loading = true
      state.error = null
    })
    builder.addMatcher(isFulfilled(getUser), state => {
      state.loading = false
      state.error = null
    })
    builder.addMatcher(isRejected(getUser), (state, { payload }) => {
      state.loading = false
      state.error = (payload as string) ?? 'Что-то пошло не так'
    })
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

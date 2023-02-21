import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { getUser, logout, signIn, signUp } from './thunk'

export type AuthState = {
  isAuth: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuth: false,
  loading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, state => {
      state.isAuth = false
    })
    builder.addCase(getUser.fulfilled, state => {
      state.isAuth = true
    })
    builder.addMatcher(isPending(signUp, signIn, logout, getUser), state => {
      state.loading = true
      state.error = null
    })
    builder.addMatcher(isFulfilled(signUp, signIn, logout, getUser), state => {
      state.loading = false
      state.error = null
    })
    builder.addMatcher(
      isRejected(signUp, signIn, logout, getUser),
      (state, { payload }) => {
        state.loading = false
        state.error = (payload as string) ?? 'Что-то пошло не так'
      }
    )
  },
})

export default authSlice.reducer

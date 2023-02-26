import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { logout, signIn, signUp } from './thunk'
import { GENERAL_ERROR } from '../../constant'

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
    builder.addMatcher(isPending(signUp, signIn, logout), state => {
      state.loading = true
      state.error = null
    })
    builder.addMatcher(isFulfilled(signUp, signIn, logout), state => {
      state.loading = false
      state.error = null
    })
    builder.addMatcher(isRejected(signUp), (state, { payload }) => {
      state.loading = false
      state.error = (payload as string) ?? GENERAL_ERROR
    })
  },
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer

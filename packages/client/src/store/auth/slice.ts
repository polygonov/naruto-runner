import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { checkAuth, logout, signIn, signUp } from './thunk'
import { GENERAL_ERROR } from '../../constant'

export type AuthState = {
  isAuth: boolean
  loading: boolean
  error: string | null
  isCheckingAuth: boolean
}

const initialState: AuthState = {
  isAuth: false,
  loading: false,
  error: null,
  isCheckingAuth: true,
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
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, state => {
      state.isAuth = false
    })
    builder.addCase(checkAuth.fulfilled, state => {
      state.isCheckingAuth = false
    })
    builder.addCase(checkAuth.rejected, state => {
      state.loading = false
      state.isCheckingAuth = false
    })
    builder.addMatcher(isPending(checkAuth, signUp, signIn, logout), state => {
      state.loading = true
      state.error = null
    })
    builder.addMatcher(isFulfilled(checkAuth, signUp, signIn), state => {
      state.isAuth = true
    })
    builder.addMatcher(
      isFulfilled(checkAuth, signUp, signIn, logout),
      state => {
        state.loading = false
        state.error = null
      }
    )
    builder.addMatcher(
      isRejected(signUp, signIn, logout),
      (state, { error }) => {
        state.loading = false
        state.error = error.message ?? GENERAL_ERROR
      }
    )
  },
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer

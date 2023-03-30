import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { getYandexClientId, signInWithYandex } from './thunk'
import { GENERAL_ERROR } from '../../constant'

export type OAuthState = {
  isOAuthLoading: boolean
  oAuthError: string | null
  clientId: string | null
}

const initialState: OAuthState = {
  isOAuthLoading: false,
  oAuthError: null,
  clientId: null,
}

export const oAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetOAuthState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getYandexClientId.fulfilled, (state, { payload }) => {
      state.clientId = payload
    })
    builder.addMatcher(
      isPending(signInWithYandex, getYandexClientId),
      state => {
        state.isOAuthLoading = true
        state.oAuthError = null
      }
    )
    builder.addMatcher(
      isFulfilled(signInWithYandex, getYandexClientId),
      state => {
        state.isOAuthLoading = false
        state.oAuthError = null
      }
    )
    builder.addMatcher(
      isRejected(signInWithYandex, getYandexClientId),
      (state, { error }) => {
        state.isOAuthLoading = false
        state.oAuthError = error.message ?? GENERAL_ERROR
      }
    )
  },
})

export const { resetOAuthState } = oAuthSlice.actions

export default oAuthSlice.reducer

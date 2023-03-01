import type { AppState } from '../index'

export const selectIsAuth = (state: AppState) => state.auth.isAuth
export const selectIsAuthLoading = (state: AppState) => state.auth.loading
export const selectAuthError = (state: AppState) => state.auth.error
export const selectIsCheckingAuth = (state: AppState) =>
  state.auth.isCheckingAuth

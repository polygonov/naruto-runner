import type { AppState } from '../index'

export const selectIsAuth = (state: AppState) => state.auth.isAuth
export const selectIsLoading = (state: AppState) => state.auth.loading
export const selectError = (state: AppState) => state.auth.error

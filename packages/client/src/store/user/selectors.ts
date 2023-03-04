import type { AppState } from '../index'

export const selectUser = (state: AppState) => state.user.user
export const selectIsLoading = (state: AppState) => state.user.loading
export const selectIsAvatarLoading = (state: AppState) =>
  state.user.avatarLoading
export const selectIsSuccess = (state: AppState) => state.user.success
export const selectIsAvatarSuccess = (state: AppState) =>
  state.user.avatarSuccess
export const selectAvatarError = (state: AppState) => state.user.avatarError
export const selectUserError = (state: AppState) => state.user.error

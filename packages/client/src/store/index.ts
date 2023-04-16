import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { AuthState } from './auth/slice'
import authReducer from './auth/slice'
import type { UserState } from './user/slice'
import userReducer from './user/slice'
import type { LeaderboardState } from './leaderboard/slice'
import leaderboardReducer from './leaderboard/slice'
import type { OAuthState } from './oauth/slice'
import oAuthReducer from './oauth/slice'

export type AppState = {
  auth: AuthState
  oauth: OAuthState
  user: UserState
  leaderboard: LeaderboardState
}

const appReducer = combineReducers<AppState>({
  auth: authReducer,
  oauth: oAuthReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
})

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export const setupStore = (initialState?: RootState) => {
  return configureStore({
    reducer: appReducer,
    preloadedState: initialState,
  })
}

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export type RootState = ReturnType<typeof appReducer>

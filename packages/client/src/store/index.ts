import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit'
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
import type { ForumState } from './forum/slice'
import forumReducer from './forum/slice'

export type AppState = {
  auth: AuthState
  oauth: OAuthState
  user: UserState
  leaderboard: LeaderboardState
  forum: ForumState
}

const appReducer = combineReducers<AppState>({
  auth: authReducer,
  oauth: oAuthReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
  forum: forumReducer,
})

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export const createStore = (initialState?: any) => {
  const options: ConfigureStoreOptions = {
    reducer: appReducer,
    devTools: process.env.NODE_ENV !== 'production',
  }
  if (initialState) {
    options.preloadedState = initialState
  }
  return configureStore(options)
}

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

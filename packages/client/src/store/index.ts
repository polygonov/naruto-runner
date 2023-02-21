import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { AuthState } from './auth/slice'
import authReducer from './auth/slice'
import type { UserState } from './user/slice'
import userReducer from './user/slice'

export type AppState = {
  auth: AuthState
  user: UserState
}

const appReducer = combineReducers<AppState>({
  auth: authReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
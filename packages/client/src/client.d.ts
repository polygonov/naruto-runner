import { StoreState } from './store'

declare const __SERVER_PORT__: number
export {}
declare global {
  interface Window {
    initialState?: StoreState
  }
  const __SERVER_PORT__: number
}

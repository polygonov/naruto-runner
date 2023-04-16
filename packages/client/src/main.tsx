import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { startServiceWorker } from './utils/serviceWorker'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import { withAuth } from './hocs/withAuth'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'

const Application = withAuth(App as any)
let storeState
if ((window as any).initialState) {
  storeState = configureStore((window as any).initialState)
  delete (window as any).initialState
} else {
  storeState = store
}

const InitApp = (
  <React.StrictMode>
    <Provider store={storeState}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

startServiceWorker()

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, InitApp)

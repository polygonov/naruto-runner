import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { startServiceWorker } from './utils/serviceWorker'
import { Provider } from 'react-redux'
import App from './App'
import { withAuth } from './hocs/withAuth'
import './index.css'
import { createStore } from './store'

const Application = withAuth(App as any)

const initialState = (window as Window).initialState

delete (window as Window).initialState

const InitApp = (
  <React.StrictMode>
    <Provider store={createStore(initialState)}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

startServiceWorker()

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, InitApp)

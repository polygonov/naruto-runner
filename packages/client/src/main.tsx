import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { startServiceWorker } from './utils/serviceWorker'
import { Provider } from 'react-redux'
import App from './App'
import { RootState, setupStore } from './store'
import { withAuth } from './hocs/withAuth'
import './index.css'

const Application = withAuth(App as any)

declare const __INITIAL_STATE__: RootState

const store = setupStore(__INITIAL_STATE__)

const InitApp = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

startServiceWorker()

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, InitApp)

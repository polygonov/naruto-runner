import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { startServiceWorker } from './utils/serviceWorker'
import { Provider } from 'react-redux'
import App from './App'
import { withAuth } from './hocs/withAuth'
import { store } from './store'
import './index.css'

const Application = withAuth(App)

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  InitApp
)

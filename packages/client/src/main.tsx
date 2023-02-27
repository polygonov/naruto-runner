import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { startServiceWorker } from './utils/serviceWorker'
import App from './App'
import './index.css'

const InitApp = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

startServiceWorker()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  InitApp
)

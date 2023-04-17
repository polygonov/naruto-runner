import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { startServiceWorker } from './utils/serviceWorker'
import { Provider } from 'react-redux'
import App from './App'
import { withAuth } from './hocs/withAuth'
import './index.css'
import { createStore } from '@reduxjs/toolkit'
import { UserService } from './api/UserService'
import { YandexAPIRepository } from './repository/YandexAPIRepository'

const Application = withAuth(App as any)

const initialState = window.initialState

delete window.initialState

const InitApp = (
  <React.StrictMode>
    <Provider
      store={createStore(
        new UserService(new YandexAPIRepository()) as any,
        initialState
      )}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

startServiceWorker()

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, InitApp)

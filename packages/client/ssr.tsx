import App from './src/App'
import { renderToString } from 'react-dom/server'
import { store } from './src/store'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { configureStore } from '@reduxjs/toolkit'

export const render = async (url: string, storeData: any) => {
  const store = configureStore(storeData)

  //await store.dispatch(getCurrentUser());

  const initialState = store.getState()
  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  )

  return [html, initialState]
}

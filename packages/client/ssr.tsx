import App from './src/App'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { matchPath } from 'react-router-dom'
import { createStore } from '@reduxjs/toolkit'
import { routes } from './src/routes'
import { UserService } from './src/api/UserService'

export const render = async (url: string, repository) => {
  const [pathname] = url.split('?')
  const store = createStore(new UserService(repository))
  const currentRoute = routes.find(route => matchPath(pathname, route.path))
  const loader = currentRoute?.loader
  if (loader) {
    await loader(store.dispatch)
  }
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

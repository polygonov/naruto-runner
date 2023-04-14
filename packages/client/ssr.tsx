import App from './src/App'
import { renderToString } from 'react-dom/server'
import { store } from './src/store'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'

export const render = (url: string) => {
  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  )

  return html
}

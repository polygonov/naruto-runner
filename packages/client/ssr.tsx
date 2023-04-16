import App from './src/App'
import { renderToString } from 'react-dom/server'
import React from 'react'
//import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'

export const render = async (url: string) => {
  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  )

  return html
}

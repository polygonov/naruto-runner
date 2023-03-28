import App from './src/App'
import ReactDOMServer from 'react-dom/server'
import { store } from './src/store'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'

export function render() {
  const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
  return ReactDOMServer.renderToString(app)
}

import App from './src/App'
import ReactDOMServer from 'react-dom/server'
import React from 'react'

export function render() {
  return ReactDOMServer.renderToString(<App />)
}

/* import { renderToString } from 'react-dom/server'
import type { Request, Response } from 'express'
import { StaticRouter } from 'react-router-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './src/store'
import App from './src/App'
import React from 'react'

export default (req: Request, res: Response) => {
  const location = req.url
  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  )
  const reactHtml = renderToString(jsx)
  //const reduxState = store.getState()

  if (location) {
    res.redirect(location)
    return
  }

  res.status(req.statusCode || 200).send(getHtml(reactHtml))
}

function getHtml(reactHtml: string) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>NarutoRunner</title>
        </head>
        <body>
            <div id="mount">${reactHtml}</div>
        </body>
        </html>
    `
}
 */

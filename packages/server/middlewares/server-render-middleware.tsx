import { renderToString } from 'react-dom/server'
import type { Request, Response } from 'express'
import { StaticRouter } from 'react-router-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'client/src/store'
import App from 'client/src/App'

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
  const reduxState = store.getState()

  if (location) {
    res.redirect(location)
    return
  }

  res.status(req.statusCode || 200).send(getHtml(reactHtml, reduxState))
}

function getHtml(reactHtml: string, reduxState = {}) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
            <title>NarutoRunner</title>
            <link href="/main.css" rel="stylesheet">
        </head>
        <body>
            <div id="mount">${reactHtml}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            <script src="/main.js"></script>
        </body>
        </html>
    `
}

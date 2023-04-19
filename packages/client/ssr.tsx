import App from './src/App'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { setUser } from './src/store/user/slice'
import { store } from './src/store'

export const render = async (
  url: string,
  repository: { getCurrent: () => any }
) => {
  const res = await repository.getCurrent()
  console.log('res', res.status)
  if (res) {
    store.dispatch(setUser(res))
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

  return [initialState, html]
}

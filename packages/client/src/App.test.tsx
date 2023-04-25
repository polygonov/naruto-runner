import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'

const appContent = 'Главная'
//@ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Init application', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})

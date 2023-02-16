import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

const appContent = 'Главная'

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Init application', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})

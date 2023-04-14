import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import { LoginForm } from './index'

const handleAuth = jest.fn()
const renderLoginForm = (props = {}) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginForm handleAuth={handleAuth} {...props} />
      </BrowserRouter>
    </Provider>
  )

describe('Login Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderLoginForm()
    expect(screen.getByRole('form')).toBeDefined()
    expect(screen.getAllByRole('textbox')).toBeDefined()
    expect(screen.getByRole('button', { name: /Авторизация/i })).toBeDefined()
  })

  it('Correctly validate fields', async () => {
    renderLoginForm()

    const submitBtn = screen.getByRole('button', { name: /Авторизация/i })
    await userEvent.click(submitBtn)
    expect(submitBtn).toBeDisabled()
  })
})

import { render, screen } from '@testing-library/react'
import { LoginForm } from './index'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

const handleAuth = jest.fn()
const renderLoginForm = (props = {}) =>
  render(
    <BrowserRouter>
      <LoginForm handleAuth={handleAuth} {...props} />
    </BrowserRouter>
  )

describe('Login Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderLoginForm()
    expect(screen.getByRole('form')).toBeDefined()
    expect(screen.getAllByRole('textbox')).toBeDefined()
    expect(screen.getByRole('button')).toBeDefined()
  })

  it('Correctly validate fields', async () => {
    renderLoginForm()

    const submitBtn = screen.getByRole('button', { name: /Авторизация/i })
    await userEvent.click(submitBtn)
    expect(submitBtn).toBeDisabled()
  })
})

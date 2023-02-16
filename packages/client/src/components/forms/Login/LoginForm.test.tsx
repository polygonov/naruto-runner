import { render, screen } from '@testing-library/react'
import { LoginForm } from './index'
import userEvent from '@testing-library/user-event'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

const renderLoginForm = (props = {}) => render(<LoginForm {...props} />)

describe.only('Login Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderLoginForm()
    expect(screen.getByRole('form')).toBeDefined()
    expect(screen.getAllByRole('textbox')).toBeDefined()
    expect(screen.getAllByRole('button')).toBeDefined()
  })

  it('Correctly validate fields', async () => {
    renderLoginForm()

    const submitBtn = screen.getByRole('button', { name: /Авторизация/i })
    await userEvent.click(submitBtn)
    expect(submitBtn).toBeDisabled()
  })
})

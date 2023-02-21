import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationForm } from './index'
import { BrowserRouter } from 'react-router-dom'

const renderRegistrationForm = (props = {}) =>
  render(
    <BrowserRouter>
      <RegistrationForm {...props} />
    </BrowserRouter>
  )

describe('Login Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderRegistrationForm()

    expect(screen.getByRole('form')).toBeDefined()
    expect(screen.getAllByRole('textbox')).toBeDefined()
    expect(screen.getByRole('button')).toBeDefined()
  })

  it('Correctly validate fields', async () => {
    renderRegistrationForm()

    const submitBtn = screen.getByRole('button', {
      name: /Зарегистрироваться/i,
    })
    await userEvent.click(submitBtn)
    expect(submitBtn).toBeDisabled()
  })
})

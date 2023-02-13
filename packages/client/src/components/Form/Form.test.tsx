import { render, screen } from '@testing-library/react'
import { Form, FormProps } from './index'
import { Input, InputProps } from '../Input'
import { Button, ButtonProps } from '../Button'
import userEvent from '@testing-library/user-event'

const FORM_TITLE = 'test-title'

const FIRST_INPUT: InputProps & { label: string } = {
  name: 'test',
  label: 'input1',
}
const SECOND_INPUT: InputProps & { label: string } = {
  name: 'test2',
  label: 'input2',
}
const FORM_ITEMS = (
  <>
    <Input {...FIRST_INPUT} />
    <Input {...SECOND_INPUT} />
  </>
)

const BUTTON_PROPS: ButtonProps = {
  type: 'submit',
  text: 'submit button',
}
const FORM_BOTTOM = <Button {...BUTTON_PROPS} />

const renderForm = (props?: Omit<FormProps, 'formItems' | 'formActions'>) =>
  render(<Form formItems={FORM_ITEMS} formActions={FORM_BOTTOM} {...props} />)

describe('Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderForm({ name: 'form' })
    expect(screen.getByRole('form')).toBeDefined()
  })

  it('Correctly added Children structure', () => {
    renderForm({ title: FORM_TITLE })

    expect(screen.getByText(FORM_TITLE)).toBeDefined()
    expect(screen.getByText(FORM_TITLE)).toHaveClass('form__title')

    expect(screen.getAllByRole('textbox')).toBeDefined()
    expect(screen.getByText(FIRST_INPUT.label)).toBeDefined()
    expect(screen.getByText(SECOND_INPUT.label)).toBeDefined()

    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.getByText(BUTTON_PROPS.text)).toBeDefined()
  })

  it('Correctly uses onSubmit prop', async () => {
    const handleSubmit = jest.fn()
    renderForm({ onSubmit: handleSubmit })

    await userEvent.click(screen.getByText(BUTTON_PROPS.text))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})

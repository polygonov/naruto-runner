import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Props } from './index'
import { Button } from './index'

const BUTTON_TEXT = 'Текст кнопки'

const createButton = (props?: Omit<Props, 'text'>) =>
  render(<Button text={BUTTON_TEXT} {...props} />)

describe('Button component', () => {
  it('Correctly renders in the DOM', () => {
    createButton()
    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.getByText(BUTTON_TEXT)).toBeDefined()
  })

  it('Correctly uses onClick prop', async () => {
    const handleClick = jest.fn()
    createButton({ onClick: handleClick })
    await userEvent.click(screen.getByText(BUTTON_TEXT))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

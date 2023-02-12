import { render, screen } from '@testing-library/react'
import { Title, TitleProps } from './index'

const TITLE_TEXT = 'TEST TITLE'
const renderTitle = (props: TitleProps) =>
  render(<Title {...props}>{TITLE_TEXT}</Title>)

describe('Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderTitle({})
    expect(screen.getByText(TITLE_TEXT)).toBeDefined()
  })

  it('Correctly added class', () => {
    renderTitle({ className: 'test-class' })
    expect(screen.getByText(TITLE_TEXT)).toHaveClass('test-class')
  })
})

import { render, screen } from '@testing-library/react'
import type { AvatarProps } from './index'
import { Avatar } from './index'

const TEST_TEXT = 'test-text'

const renderAvatar = (props?: AvatarProps) => render(<Avatar {...props} />)

describe('Avatar component', () => {
  it('Correctly renders in the DOM', () => {
    renderAvatar()
    expect(screen.getByRole('img')).toBeDefined()
  })

  it('Uses alt attribute', () => {
    renderAvatar({ alt: TEST_TEXT })
    expect(screen.getByRole('img')).toHaveAttribute('alt', TEST_TEXT)
  })

  it('Correctly adds className mix', () => {
    renderAvatar({ className: TEST_TEXT })
    expect(screen.getByRole('img')).toHaveClass(TEST_TEXT)
  })
})

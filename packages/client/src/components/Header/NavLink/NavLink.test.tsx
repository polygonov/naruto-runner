import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import type { NavLinkProps } from './index'
import { NavLink } from './index'

const linkBaseProps: NavLinkProps = {
  text: 'Link',
  href: '/home',
}

const renderLink = (props?: NavLinkProps) =>
  render(
    <BrowserRouter>
      <NavLink {...linkBaseProps} {...props} />
    </BrowserRouter>
  )

describe('NavLink component', () => {
  it('Correctly renders in the DOM', () => {
    renderLink()
    expect(screen.getByRole('link')).toBeDefined()
    expect(screen.getByText(linkBaseProps.text)).toBeDefined()
  })
})

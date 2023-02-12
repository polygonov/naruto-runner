import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import type { NavLinkProps } from './index'
import { NavLink } from './index'

const linkBaseProps: NavLinkProps = {
  text: 'Link',
  href: '/home',
}

const renderLink = (props: NavLinkProps) =>
  render(
    <BrowserRouter>
      <NavLink {...props} />
    </BrowserRouter>
  )

describe('NavLink component', () => {
  it('Correctly renders in the DOM', () => {
    renderLink(linkBaseProps)
    expect(screen.getByRole('link')).toBeDefined()
    expect(screen.getByText(linkBaseProps.text)).toBeDefined()
  })

  it('Uses active class on active route', () => {
    renderLink({ ...linkBaseProps, href: '/' })
    expect(screen.getByRole('link')).toHaveClass('navigation-link_active')
  })

  it('Uses hidden class if isInvisible prop is true', () => {
    renderLink({ ...linkBaseProps, isInvisible: true })
    expect(screen.getByRole('link')).toHaveClass('navigation-link_hidden')
  })
})

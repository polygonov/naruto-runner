import type { AnchorHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import './index.css'

export type NavLinkProps = {
  href: string
  text: string
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const NavLink: FC<NavLinkProps> = memo(
  ({ href, text, className = '', ...props }) => {
    const classes = classNames('navigation-link', className)

    return (
      <RouterLink
        className={({ isActive }) =>
          isActive ? `${classes} navigation-link_active` : classes
        }
        to={href}
        {...props}>
        {text}
      </RouterLink>
    )
  }
)

import type { AnchorHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import './index.css'

export type NavLinkProps = {
  href: string
  text: string
  isInvisible?: boolean
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Мемоизированный компонент навигационной ссылки.
 * В качестве props также принимает все стандартные HTML-атрибуты для `<a>`.
 */

export const NavLink: FC<NavLinkProps> = memo(
  ({ href, text, isInvisible = false, className = '', ...props }) => {
    const classes = classNames(
      'navigation-link',
      { 'navigation-link_hidden': isInvisible },
      className
    )

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

import type { AnchorHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import randomClickSound from '../../utils/randomClickSound'
import '../Button/index.css'

export type LinkProps = {
  href: string
  text: string
  view?: 'primary' | 'secondary' | 'ghost'
  withSound?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const Link: FC<LinkProps> = memo(
  ({ href, text, view = 'primary', withSound = true, ...props }) => {
    function addSound() {
      if (withSound) {
        return randomClickSound
      }
      return
    }
    return (
      <RouterLink
        className={classNames('button', `button_view_${view}`)}
        to={href}
        onMouseUp={addSound}
        {...props}>
        {text}
      </RouterLink>
    )
  }
)

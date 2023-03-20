import type { AnchorHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import randomClickSound from '../../utils/randomClickSound'
import '../Button/index.css'

export type LinkProps = {
  href: string
  text: string
  view?: 'primary' | 'secondary' | 'ghost'
  withSound?: boolean
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const Link: FC<LinkProps> = memo(
  ({ href, text, view = 'primary', withSound = true, className, ...props }) => {
    function addSound() {
      if (withSound) {
        return randomClickSound
      }
    }

    console.log('render', view)

    return (
      <RouterLink
        className={classNames('button', `button_view_${view}`, className)}
        to={href}
        onMouseUp={addSound}
        {...props}>
        {text}
      </RouterLink>
    )
  }
)

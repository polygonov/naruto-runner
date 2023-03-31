import type { ButtonHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import classNames from 'classnames'
import randomClickSound from '../../utils/randomClickSound'
import './index.css'

export type ButtonProps = {
  text: string
  view?: 'primary' | 'secondary' | 'ghost'
  className?: string
  withSound?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Базовый мемоизированный компонент кнопки.
 * В качестве props также принимает все стандартные HTML-атрибуты для `<button>`.
 * По умолчанию имеет атрибут type="button".
 */

export const Button: FC<ButtonProps> = memo(
  ({
    text,
    view = 'primary',
    type = 'button',
    className = '',
    withSound = true,
    ...props
  }) => {
    function addSound() {
      if (withSound) {
        return randomClickSound
      }
      return
    }
    return (
      <button
        type={type}
        className={classNames('button', `button_view_${view}`, className)}
        onMouseUp={addSound}
        {...props}>
        {text}
      </button>
    )
  }
)

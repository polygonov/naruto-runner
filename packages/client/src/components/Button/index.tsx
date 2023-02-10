import type { ButtonHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import classNames from 'classnames'
import './index.css'

export type Props = {
  text: string
  view?: 'primary' | 'secondary' | 'ghost'
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Базовый мемоизированный компонент кнопки.
 * В качестве props также принимает все стандартные HTML-атрибуты для `<button>`.
 * По умолчанию имеет атрибут type="button".
 */

export const Button: FC<Props> = memo(
  ({ text, view = 'primary', type = 'button', className = '', ...props }) => {
    return (
      <button
        type={type}
        className={classNames('button', `button_view_${view}`, className)}
        {...props}>
        {text}
      </button>
    )
  }
)

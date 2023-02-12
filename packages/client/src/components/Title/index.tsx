import type { BaseHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import classNames from 'classnames'
import './index.css'

export type TitleProps = {
  className?: string
  view?: 'base'
} & BaseHTMLAttributes<HTMLHeadingElement>

export const Title: FC<TitleProps> = memo(
  ({ className, view = 'base', ...props }) => {
    return (
      <h2 className={classNames('title', `title_view_${view}`, className)}>
        {props.children}
      </h2>
    )
  }
)

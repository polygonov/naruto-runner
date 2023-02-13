import type { FC, ImgHTMLAttributes } from 'react'
import { memo } from 'react'
import classNames from 'classnames'
import defaultImage from './images/avatar-default.jpg'
import './index.css'

export type AvatarProps = {
  src?: string
  alt?: string
  size?: 'default' | 'small'
  className?: string
} & ImgHTMLAttributes<HTMLImageElement>

/**
 * Базовый мемоизированный компонент аватара.
 * В качестве props также принимает все стандартные HTML-атрибуты для `<img>`.
 * По умолчанию имеет изображение-заглушку.
 * */

export const Avatar: FC<AvatarProps> = memo(
  ({ src, alt, size = 'default', className, ...props }) => {
    return (
      <img
        src={src || defaultImage}
        alt={alt || 'Аватар'}
        draggable={false}
        className={classNames('avatar', `avatar_size_${size}`, className)}
        {...props}
      />
    )
  }
)

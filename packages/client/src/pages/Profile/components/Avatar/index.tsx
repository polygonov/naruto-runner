import type { ChangeEvent, FC } from 'react'
import { memo, useState } from 'react'
import classNames from 'classnames'
import { PRACTICUM_ORIGIN_RESOURCE, regExps } from '../../../../constants'
import defaultImage from './images/avatar-default.jpg'
import './index.css'

const AVATAR_MAX_SIZE = 800 * 1024

type AvatarError = string | null

type AvatarProps = {
  src?: string
  className?: string
  onChange: (file: File) => void
}

export const Avatar: FC<AvatarProps> = memo(({ src, onChange, className }) => {
  const [currentImage, setCurrentImage] = useState<string>(() =>
    src ? `${PRACTICUM_ORIGIN_RESOURCE}/${src}` : defaultImage
  )
  const [error, setError] = useState<AvatarError>(null)

  const changeImage = (evt: ChangeEvent<HTMLInputElement>) => {
    setError(null)

    const file = evt.target.files?.[0]

    if (!file) {
      return
    }

    if (!regExps.image.test(file.name) || file.size > AVATAR_MAX_SIZE) {
      setError('Возможные форматы: JPG, GIF или PNG. Максимальный размер 800K')
      return
    }

    setCurrentImage(URL.createObjectURL(file))
    onChange(file)
  }

  return (
    <div className={classNames('avatar', className)}>
      <div className="avatar__container">
        <img src={currentImage} alt="Аватар" className="avatar__image" />
        <label className="avatar__overlay">
          <span className="avatar__upload-text">Изменить фото</span>
          <input
            type="file"
            accept="image/*"
            name="image"
            className="avatar__input-upload"
            onChange={changeImage}
          />
        </label>
      </div>

      {error && <span className="avatar__error">{error}</span>}
    </div>
  )
})

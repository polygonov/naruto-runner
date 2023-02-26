import type { ChangeEvent, FC } from 'react'
import { memo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { regExps } from '../../../../constant'
import { Avatar } from '../../../../components/Avatar'
import './index.css'

const AVATAR_MAX_SIZE = 800 * 1024

type AvatarUploadError = string | null

type AvatarUploadProps = {
  src: string | File
  disabled?: boolean
  className?: string
  onUpload: (file: File) => void
}

export const AvatarUpload: FC<AvatarUploadProps> = memo(
  ({ src, disabled, onUpload, className }) => {
    const [currentImage, setCurrentImage] = useState('')
    const [error, setError] = useState<AvatarUploadError>(null)

    const clearError = () => setError(null)

    const changeImage = (evt: ChangeEvent<HTMLInputElement>) => {
      clearError()

      const file = evt.target.files?.[0]

      if (!file) {
        return
      }

      if (!regExps.image.test(file.name) || file.size > AVATAR_MAX_SIZE) {
        setError(
          'Возможные форматы: JPG, GIF или PNG. Максимальный размер 800Kb'
        )
        return
      }
      onUpload(file)
    }

    useEffect(() => {
      const source = src instanceof File ? URL.createObjectURL(src) : src
      setCurrentImage(source)
    }, [src])

    if (disabled) {
      return <Avatar src={currentImage} className={className} />
    }

    return (
      <div className={classNames('avatar-upload', className)}>
        <div className="avatar-upload__container">
          <Avatar src={currentImage} />
          <label className="avatar-upload__overlay">
            <span className="avatar-upload__text">Изменить фото</span>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="avatar-upload__input"
              onChange={changeImage}
            />
          </label>
        </div>

        {error && (
          <span onClick={clearError} className="avatar-upload__error">
            {error}
          </span>
        )}
      </div>
    )
  }
)

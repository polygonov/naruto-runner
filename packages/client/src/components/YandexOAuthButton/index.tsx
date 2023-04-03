import type { FC } from 'react'
import { ButtonHTMLAttributes, memo } from 'react'
import classNames from 'classnames'
import { useYandexOAuth } from '../../hooks/useYandexOAuth'
import './index.css'

type YandexOAuthButtonProps = {
  view?: 'full' | 'icon'
  className?: string
} & Exclude<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick' | 'disabled'
>

export const YandexOAuthButton: FC<YandexOAuthButtonProps> = memo(
  ({ view = 'full', className, ...props }) => {
    const { isOAuthLoading, goToYandexAuth } = useYandexOAuth()

    return (
      <button
        {...props}
        className={classNames(
          'yandex-button',
          {
            'yandex-button_view_icon': view === 'icon',
            'yandex-button_view_full': view === 'full',
          },
          className
        )}
        type="button"
        onClick={goToYandexAuth}
        disabled={isOAuthLoading}
        aria-label="Войти с Яндекс ID">
        {view === 'full' && (
          <>
            <span className="yandex-button__icon"></span>
            <span className="yandex-button__text"></span>
          </>
        )}
      </button>
    )
  }
)

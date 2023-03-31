import type { FC } from 'react'
import { memo } from 'react'
import { useYandexOAuth } from '../../hooks/useYandexOAuth'

export const YandexOAuthButton: FC = memo(() => {
  const { isOAuthLoading, goToYandexAuth } = useYandexOAuth()

  return (
    <button type="button" onClick={goToYandexAuth} disabled={isOAuthLoading}>
      Yandex
    </button>
  )
})

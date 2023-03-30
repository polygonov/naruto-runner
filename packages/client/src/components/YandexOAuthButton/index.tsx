import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { useAppDispatch } from '../../store'
import { getYandexClientId } from '../../store/oauth/thunk'
import { useOAuthRedirect } from '../../hooks/useOAuthRedirect'
import { YANDEX_OAUTH_REDIRECT_CONFIG } from '../../constant'

export const YandexOAuthButton: FC = memo(() => {
  const dispatch = useAppDispatch()

  const { isOAuthLoading } = useOAuthRedirect(YANDEX_OAUTH_REDIRECT_CONFIG)

  const signInWithYandex = useCallback(() => {
    dispatch(getYandexClientId())
  }, [dispatch])

  return (
    <button type="button" onClick={signInWithYandex} disabled={isOAuthLoading}>
      Yandex
    </button>
  )
})

import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../store'
import { OAUTH_RESPONSE_PARAM, YANDEX_OAUTH_REDIRECT_CONFIG } from '../constant'
import { getYandexClientId, signInWithYandex } from '../store/oauth/thunk'
import { useOAuthRedirect } from './useOAuthRedirect'
import { useSearchParams } from 'react-router-dom'

export const useYandexOAuth = () => {
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const codeParam = searchParams.get(OAUTH_RESPONSE_PARAM)

  const { isOAuthLoading, oAuthError } = useOAuthRedirect(
    YANDEX_OAUTH_REDIRECT_CONFIG
  )

  const goToYandexAuth = useCallback(() => {
    dispatch(getYandexClientId())
  }, [dispatch])

  useEffect(() => {
    if (codeParam) {
      dispatch(signInWithYandex({ code: codeParam }))
    }
  }, [codeParam, dispatch])

  useEffect(() => {
    if (oAuthError) {
      // TODO тостъ
      alert(oAuthError)
    }
  }, [oAuthError])

  return {
    isOAuthLoading,
    goToYandexAuth,
  }
}

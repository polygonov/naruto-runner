import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { selectOAuth } from '../store/oauth/selectors'
import { stringifyUrlParams } from '../utils/stringifyUrlParams'
import { resetOAuthState } from '../store/oauth/slice'

type OAuthRedirectParams = {
  url: string
  params: Record<string, string>
  clientIdFieldName?: string
}

/**
 * Хук читает oauth store и при получении clientId редиректит на страницу сервиса OAuth
 * */

export const useOAuthRedirect = ({
  url,
  params,
  clientIdFieldName = 'client_id',
}: OAuthRedirectParams) => {
  const dispatch = useAppDispatch()

  const { clientId, isOAuthLoading, oAuthError } = useAppSelector(selectOAuth)

  useEffect(() => {
    if (clientId) {
      window.location.assign(
        stringifyUrlParams(url, {
          ...params,
          [clientIdFieldName]: clientId,
        })
      )
    }

    return () => {
      dispatch(resetOAuthState())
    }
  }, [params, clientId, url, clientIdFieldName, dispatch])

  return {
    isOAuthLoading,
    oAuthError,
  }
}

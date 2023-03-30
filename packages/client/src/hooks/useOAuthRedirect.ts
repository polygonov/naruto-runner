import { useEffect } from 'react'
import { useAppSelector } from '../store'
import { selectOAuth } from '../store/oauth/selectors'
import { stringifyUrlParams } from '../utils/stringifyUrlParams'

type OAuthRedirectParams = {
  url: string
  params: Record<string, string>
  clientIdFieldName?: string
}

export const useOAuthRedirect = ({
  url,
  params,
  clientIdFieldName = 'client_id',
}: OAuthRedirectParams) => {
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
  }, [params, clientId, url, clientIdFieldName])

  useEffect(() => {
    if (oAuthError) {
      // TODO показать тостъ
      alert(oAuthError)
    }
  }, [oAuthError])

  return {
    isOAuthLoading,
    oAuthError,
  }
}

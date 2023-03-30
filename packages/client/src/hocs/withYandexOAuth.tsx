import { ReactElement, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../store'
import { signInWithYandex } from '../store/oauth/thunk'

export const withYandexOAuth = (Component: () => ReactElement) => () => {
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()

  const codeParam = searchParams.get('code')

  useEffect(() => {
    if (codeParam) {
      dispatch(signInWithYandex({ code: codeParam }))
    }
  }, [codeParam, dispatch])

  return <Component />
}

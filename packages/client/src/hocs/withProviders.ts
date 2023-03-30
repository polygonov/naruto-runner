import { compose } from '@reduxjs/toolkit'
import { withYandexOAuth } from './withYandexOAuth'
import { withAuth } from './withAuth'

export const withProviders = compose<() => JSX.Element>(
  withYandexOAuth,
  withAuth
)

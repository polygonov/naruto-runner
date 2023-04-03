import { createAsyncThunk } from '@reduxjs/toolkit'
import type { YandexOAuthPayload } from '../../api/oauth/types'
import { yandexOAuthApi } from '../../api/oauth'
import { checkAuth } from '../auth/thunk'

export const getYandexClientId = createAsyncThunk(
  'oauth/yandex-get-service-id',
  async () => {
    const { service_id } = await yandexOAuthApi.getServiceId()
    return service_id
  }
)

export const signInWithYandex = createAsyncThunk(
  'oauth/yandex-sign-in',
  async (payload: YandexOAuthPayload, { dispatch }) => {
    await yandexOAuthApi.signIn(payload)
    dispatch(checkAuth())
  }
)

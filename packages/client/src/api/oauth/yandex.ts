import { OAUTH_REDIRECT_URI } from '../../constant'
import { BaseApi } from '../base'
import { HttpMethod } from '../constants'
import type { GetServiceIdResponse, YandexOAuthPayload } from './types'

class YandexOAuthApi extends BaseApi {
  signIn = async (payload: YandexOAuthPayload) =>
    this.createRequest(this.baseUrl, {
      method: HttpMethod.POST,
      data: { ...payload, redirect_uri: OAUTH_REDIRECT_URI },
    })

  getServiceId = async () =>
    this.createRequest<GetServiceIdResponse>(`${this.baseUrl}/service-id`, {
      params: {
        redirect_uri: OAUTH_REDIRECT_URI,
      },
    })
}

export const yandexOAuthApi = new YandexOAuthApi('oauth/yandex')

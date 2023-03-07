import { PRACTICUM_ORIGIN } from '../../constant'
import type { ApiErrorResponse, ContentType, RequestOptions } from '../types'
import { createFormData } from '../../utils/createFormData'
import { HttpMethod } from '../constants'

export abstract class BaseApi {
  protected baseUrl: string

  constructor(serviceUrl: string) {
    this.baseUrl = `${PRACTICUM_ORIGIN}/${serviceUrl}`
  }

  protected async handleServerResponse<T>(
    this: void,
    res: Response,
    options?: RequestOptions
  ): Promise<T | never> {
    const isSuccessful = res.ok

    const response =
      isSuccessful && !options?.shouldParseResponse ? res : await res.json()

    return isSuccessful
      ? response
      : Promise.reject(new Error((response as ApiErrorResponse)?.reason))
  }

  protected formatBody(contentType: ContentType, body: RequestOptions['data']) {
    if (!body) {
      return ''
    }

    switch (contentType) {
      case 'form-data':
        return createFormData(body)
      default:
        return JSON.stringify(body)
    }
  }

  protected async createRequest<T>(
    url: RequestInfo | URL,
    options: RequestInit & RequestOptions = {}
  ) {
    const {
      shouldParseResponse = true,
      contentType = 'json',
      data,
      credentials = 'include',
      ...fetchOptions
    } = options

    const requestOptions = {
      credentials,
      ...fetchOptions,
    }

    const isGetMethod = options.method === HttpMethod.GET

    if (!isGetMethod && data) {
      requestOptions.body = this.formatBody(contentType, data)
    }

    if (!isGetMethod && data && contentType === 'json') {
      requestOptions.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(url, requestOptions)

    return this.handleServerResponse<T>(response, { shouldParseResponse })
  }
}

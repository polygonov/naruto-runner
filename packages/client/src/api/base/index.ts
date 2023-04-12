import { PRACTICUM_ORIGIN } from '../../constant'
import { HttpErrorCodes, HttpMethod } from '../constants'
import type { ApiErrorResponse, ContentType, RequestOptions } from '../types'
import { createFormData } from '../../utils/createFormData'
import { stringifyUrlParams } from '../../utils/stringifyUrlParams'

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

    const isInternalError = res.status === HttpErrorCodes.Internal

    const shouldNotParseResponse =
      (isSuccessful && !options?.shouldParseResponse) || isInternalError

    const response = shouldNotParseResponse ? res : await res.json()

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
    url: string,
    options: RequestInit & RequestOptions = {}
  ) {
    const {
      shouldParseResponse = true,
      contentType = 'json',
      data,
      credentials = 'include',
      method = HttpMethod.GET,
      params,
      ...fetchOptions
    } = options

    const requestOptions = {
      credentials,
      method,
      ...fetchOptions,
    }

    const isGetMethod = method === HttpMethod.GET

    if (!isGetMethod && data) {
      requestOptions.body = this.formatBody(contentType, data)

      if (contentType === 'json') {
        requestOptions.headers = {
          ...options.headers,
          'Content-Type': 'application/json',
        }
      }
    }

    let requestUrl = url

    if (params) {
      requestUrl = stringifyUrlParams(url, params)
    }

    const response = await fetch(requestUrl, requestOptions)

    return this.handleServerResponse<T>(response, { shouldParseResponse })
  }
}

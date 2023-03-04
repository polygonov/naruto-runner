import { PRACTICUM_ORIGIN } from '../../constant'
import type { ApiErrorResponse, RequestOptions } from '../types'

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
    const response = res.ok && options?.isVoidResponse ? '' : await res.json()
    return res.ok
      ? response
      : Promise.reject(new Error((response as ApiErrorResponse)?.reason))
  }

  protected async createRequest<T>(
    url: RequestInfo | URL,
    options: RequestInit & RequestOptions = {}
  ) {
    const { isVoidResponse, ...fetchOptions } = options
    const response = await fetch(url, fetchOptions)
    return this.handleServerResponse<T>(response, { isVoidResponse })
  }
}

import { PRACTICUM_ORIGIN } from '../../constant'
import type { ApiErrorResponse } from '../types'

export abstract class BaseApi {
  protected baseUrl: string

  constructor(serviceUrl: string) {
    this.baseUrl = `${PRACTICUM_ORIGIN}/${serviceUrl}`
  }

  protected async handleServerResponse<T>(
    this: void,
    res: Response
  ): Promise<T | ApiErrorResponse> {
    const response = await res.json()
    return res.ok ? response : Promise.reject(response)
  }

  protected async createRequest<T>(
    url: RequestInfo | URL,
    options?: RequestInit
  ) {
    const response = await fetch(url, options)
    return this.handleServerResponse<T>(response)
  }
}

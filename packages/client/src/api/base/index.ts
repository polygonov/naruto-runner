import { PRACTICUM_ORIGIN } from '../../constant'

export abstract class BaseApi {
  protected baseUrl: string

  constructor(serviceUrl: string) {
    this.baseUrl = `${PRACTICUM_ORIGIN}/${serviceUrl}`
  }

  protected async checkServerResponse<T>(
    this: void,
    res: Response
  ): Promise<T | never> {
    const response = await res.json()
    return res.ok ? response : Promise.reject(response)
  }
}

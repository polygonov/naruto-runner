import { GetUserResponse, RegisterPayload, RegisterResponse } from './types'
import { trimData } from '../../utils/trimData'
import { HttpMethod, userStubFields } from '../constants'
import { BaseApi } from '../base'

class AuthApi extends BaseApi {
  signUp = async (payload: RegisterPayload) =>
    this.createRequest<RegisterResponse>(`${this.baseUrl}/signup`, {
      method: HttpMethod.POST,
      data: { ...trimData(payload), ...userStubFields },
    })

  getUser = async () =>
    this.createRequest<GetUserResponse>(`${this.baseUrl}/user`)
}

export const authApi = new AuthApi('auth')

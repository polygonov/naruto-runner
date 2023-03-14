import {
  AuthPayload,
  GetUserResponse,
  RegisterPayload,
  RegisterResponse,
} from './types'
import { trimData } from '../../utils/trimData'
import { HttpMethod, userStubFields } from '../constants'
import { BaseApi } from '../base'

class AuthApi extends BaseApi {
  signUp = async (payload: RegisterPayload) =>
    this.createRequest<RegisterResponse>(`${this.baseUrl}/signup`, {
      method: HttpMethod.POST,
      data: { ...trimData(payload), ...userStubFields },
    })

  signIn = async (payload: AuthPayload) =>
    this.createRequest(`${this.baseUrl}/signin`, {
      shouldParseResponse: false,
      method: HttpMethod.POST,
      data: { ...trimData(payload) },
    })

  logout = async () =>
    this.createRequest(`${this.baseUrl}/logout`, {
      shouldParseResponse: false,
    })

  getUser = async () =>
    this.createRequest<GetUserResponse>(`${this.baseUrl}/user`)
}

export const authApi = new AuthApi('auth')

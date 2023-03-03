import { AuthPayload, GetUserResponse, RegisterPayload, RegisterResponse } from './types'
import { trimData } from '../../utils/trimData'
import { userStubFields } from '../constants'
import { BaseApi } from '../base'

class AuthApi extends BaseApi {
  signUp = async (payload: RegisterPayload) =>
    this.createRequest<RegisterResponse>(`${this.baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify({ ...trimData(payload), ...userStubFields }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

  signIn = async (payload: AuthPayload) =>
    this.createRequest<void>(`${this.baseUrl}/signin`, {
      method: 'POST',
      body: JSON.stringify({ ...trimData(payload) }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

  getUser = async () =>
    this.createRequest<GetUserResponse>(`${this.baseUrl}/user`, {
      credentials: 'include',
    })
}

export const authApi = new AuthApi('auth')

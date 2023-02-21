import { GetUserResponse, RegisterPayload, RegisterResponse } from './types'
import { trimData } from '../../utils/trimData'
import { userStubFields } from '../constants'
import { BaseApi } from '../base'

class AuthApi extends BaseApi {
  signUp = async (payload: RegisterPayload) => {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify({ ...trimData(payload), ...userStubFields }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return this.checkServerResponse<RegisterResponse>(response)
  }

  getUser = async () => {
    const response = await fetch(`${this.baseUrl}/user`, {
      credentials: 'include',
    })
    return this.checkServerResponse<GetUserResponse>(response)
  }
}

export const authApi = new AuthApi('auth')

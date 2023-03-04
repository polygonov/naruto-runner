import { BaseApi } from '../base'
import type {
  ChangeAvatarPayload,
  ChangePasswordPayload,
  ChangeUserPayload,
  User,
} from './types'
import { trimData } from '../../utils/trimData'
import { createFormData } from '../../utils/createFormData'
import { userStubFields } from '../constants'

class UserApi extends BaseApi {
  changeUserData = async (payload: ChangeUserPayload) =>
    this.createRequest<User>(`${this.baseUrl}/profile`, {
      method: 'PUT',
      body: JSON.stringify({ ...trimData(payload), ...userStubFields }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

  changeUserAvatar = async (payload: ChangeAvatarPayload) =>
    this.createRequest<User>(`${this.baseUrl}/profile/avatar`, {
      method: 'PUT',
      body: createFormData(payload),
      credentials: 'include',
    })

  changePassword = async (payload: ChangePasswordPayload) =>
    this.createRequest<void>(`${this.baseUrl}/password`, {
      method: 'PUT',
      body: JSON.stringify(trimData(payload)),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      isVoidResponse: true,
    })
}

export const userApi = new UserApi('user')

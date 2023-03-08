import { BaseApi } from '../base'
import type {
  ChangeAvatarPayload,
  ChangePasswordPayload,
  ChangeUserPayload,
  User,
} from './types'
import { trimData } from '../../utils/trimData'
import { HttpMethod, userStubFields } from '../constants'

class UserApi extends BaseApi {
  changeUserData = async (payload: ChangeUserPayload) =>
    this.createRequest<User>(`${this.baseUrl}/profile`, {
      method: HttpMethod.PUT,
      data: { ...trimData(payload), ...userStubFields },
    })

  changeUserAvatar = async (payload: ChangeAvatarPayload) =>
    this.createRequest<User>(`${this.baseUrl}/profile/avatar`, {
      method: HttpMethod.PUT,
      contentType: 'form-data',
      data: payload,
    })

  changePassword = async (payload: ChangePasswordPayload) =>
    this.createRequest<void>(`${this.baseUrl}/password`, {
      method: HttpMethod.PUT,
      data: trimData(payload),
      shouldParseResponse: false,
    })
}

export const userApi = new UserApi('user')

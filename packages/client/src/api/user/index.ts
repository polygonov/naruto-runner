import { BaseApi } from '../base'
import type {
  ChangeAvatarPayload,
  ChangePasswordPayload,
  ChangeUserPayload,
  ChangeThemePayload,
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

  changeUserTheme = async (payload: ChangeThemePayload) =>
    this.createRequest<void>(`${this.serverUrl}/update-theme`, {
      method: HttpMethod.POST,
      data: payload,
    })

  changePassword = async (payload: ChangePasswordPayload) =>
    this.createRequest<void>(`${this.baseUrl}/password`, {
      method: HttpMethod.PUT,
      data: trimData(payload),
      shouldParseResponse: false,
    })

  getUserById = async (id: number) =>
    this.createRequest<User>(`${this.baseUrl}/${id}`, {
      method: HttpMethod.GET,
    })
}

export const userApi = new UserApi('user')

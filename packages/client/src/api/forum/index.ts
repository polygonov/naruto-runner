import { BaseApi } from '../base'
import { HttpMethod } from '../constants'

class ForumApi extends BaseApi {
  getTopics = async () =>
    this.createRequest(`${this.baseUrl}/topics`, {
      method: HttpMethod.GET,
    })
}

export const forumApi = new ForumApi('topics', false)

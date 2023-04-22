import { BaseApi } from '../base'
import { HttpMethod } from '../constants'
import { trimData } from '../../utils/trimData'
import {
  CreateTopicPayload,
  RequestTopicsPayload,
  Topic,
  TopicsList,
} from './types'

class ForumApi extends BaseApi {
  requestTopics = async (payload: RequestTopicsPayload) =>
    this.createRequest<TopicsList>(`${this.baseUrl}/`, {
      method: HttpMethod.GET,
      data: { ...trimData(payload) },
    })

  createTopic = async (payload: CreateTopicPayload) =>
    this.createRequest(`${this.baseUrl}/`, {
      method: HttpMethod.POST,
      data: trimData(payload),
    })

  requestTopic = async (id: number) =>
    this.createRequest<Topic>(`${this.baseUrl}/${id}/`, {
      method: HttpMethod.GET,
    })
}

export const forumApi = new ForumApi('topics', false)

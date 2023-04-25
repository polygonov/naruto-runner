import { BaseApi } from '../base'
import { HttpMethod } from '../constants'
import { trimData } from '../../utils/trimData'
import {
  CreateCommentPayload,
  CreateTopicPayload,
  RequestTopicsPayload,
  Topic,
  TopicsList,
} from './types'

class ForumApi extends BaseApi {
  requestTopics = async (payload: RequestTopicsPayload) =>
    this.createRequest<TopicsList>(`${this.baseUrl}/`, {
      method: HttpMethod.GET,
      params: { ...payload },
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

  createComment = async (payload: CreateCommentPayload) =>
    this.createRequest<Topic>(`${this.baseUrl}/${payload.topicId}/comments/`, {
      method: HttpMethod.POST,
      data: trimData(payload),
    })
}

export const forumApi = new ForumApi('topics', false)

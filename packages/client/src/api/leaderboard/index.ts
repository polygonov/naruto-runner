import { RATING_FIELD_NAME, TEAM_NAME } from '../../constant'
import { BaseApi } from '../base'
import { HttpMethod } from '../constants'
import type {
  AddToLeaderboardPayload,
  LeaderboardResponse,
  RequestLeaderboardPayload,
} from './types'

class LeaderboardApi extends BaseApi {
  addToLeaderboard = async (payload: AddToLeaderboardPayload) =>
    this.createRequest(`${this.baseUrl}`, {
      method: HttpMethod.POST,
      data: payload,
      shouldParseResponse: false,
    })

  requestLeaderboard = async ({
    ratingFieldName = RATING_FIELD_NAME,
    cursor = 0,
    limit = 50,
  }: RequestLeaderboardPayload) =>
    this.createRequest<LeaderboardResponse>(`${this.baseUrl}/${TEAM_NAME}`, {
      method: HttpMethod.POST,
      data: { ratingFieldName, cursor, limit },
    })
}

export const leaderboardApi = new LeaderboardApi('leaderboard')

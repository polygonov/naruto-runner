import { RATING_FIELD_NAME, TEAM_NAME } from '../../constant'
import { BaseApi } from '../base'
import { HttpMethod } from '../constants'
import type {
  LeaderboardRecordData,
  LeaderboardResponse,
  RequestLeaderboardPayload,
} from './types'

class LeaderboardApi extends BaseApi {
  addToLeaderboard = async (payload: LeaderboardRecordData) =>
    this.createRequest(this.baseUrl, {
      method: HttpMethod.POST,
      data: {
        data: payload,
        ratingFieldName: RATING_FIELD_NAME,
        teamName: TEAM_NAME,
      },
      shouldParseResponse: false,
    })

  requestLeaderboard = async ({
    cursor = 0,
    limit = 20,
  }: RequestLeaderboardPayload) =>
    this.createRequest<LeaderboardResponse>(`${this.baseUrl}/${TEAM_NAME}`, {
      method: HttpMethod.POST,
      data: { ratingFieldName: RATING_FIELD_NAME, cursor, limit },
    })
}

export const leaderboardApi = new LeaderboardApi('leaderboard')

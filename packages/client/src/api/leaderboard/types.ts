import { RATING_FIELD_NAME } from '../../constant'

export type LeaderboardRecordData = {
  id: number
  username: string
  [RATING_FIELD_NAME]: number
  avatar: string | null
}

export type AddToLeaderboardPayload = LeaderboardRecordData

export type RequestLeaderboardPayload = {
  cursor?: number
  limit?: number
}

export type LeaderboardResponse = {
  data: LeaderboardRecordData
}[]

export type LeaderboardListRecord = LeaderboardRecordData & {
  order: number
}

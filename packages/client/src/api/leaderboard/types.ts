import { RATING_FIELD_NAME } from '../../constant'

export type LeaderboardRecordData = {
  id: number
  [RATING_FIELD_NAME]: number
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
  username: string
  avatar: string | null
  order: number
}

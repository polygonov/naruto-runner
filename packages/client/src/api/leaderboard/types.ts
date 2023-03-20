export type LeaderboardRecordData = {
  id: number
  username: string
  score: number
  avatar: string | null
}

export type AddToLeaderboardPayload = {
  data: LeaderboardRecordData
  ratingFieldName: string
  teamName: string
}

export type RequestLeaderboardPayload = {
  ratingFieldName?: string
  cursor?: number
  limit?: number
}

export type LeaderboardResponse = {
  data: LeaderboardRecordData
}[]

export type LeaderboardListRecord = LeaderboardRecordData & {
  order: number
}

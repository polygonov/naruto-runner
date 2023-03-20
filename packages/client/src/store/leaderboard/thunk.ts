import { createAsyncThunk } from '@reduxjs/toolkit'
import { leaderboardApi } from '../../api/leaderboard'
import type {
  AddToLeaderboardPayload,
  RequestLeaderboardPayload,
} from '../../api/leaderboard/types'
import { LeaderboardListRecord } from '../../api/leaderboard/types'
import { userApi } from '../../api/user'
import { User } from '../../api/user/types'
import { updateResourcePath } from '../../utils/updateResourcePath'

export const addToLeaderboard = createAsyncThunk(
  'leaderboard/add',
  async (payload: AddToLeaderboardPayload) => {
    await leaderboardApi.addToLeaderboard(payload)
  }
)

export const requestLeaderboard = createAsyncThunk(
  'leaderboard/request',
  async (payload: RequestLeaderboardPayload = {}) => {
    const table = await leaderboardApi.requestLeaderboard(payload)

    const getUserPromises = table.map(({ data }) =>
      userApi.getUserById(data.id)
    )

    const users = await Promise.all(getUserPromises)

    const usersMap = users.reduce((acc, current) => {
      acc[current.id] = current
      return acc
    }, {} as Record<string, User>)

    const mappedTable: LeaderboardListRecord[] = table.map(({ data }, i) => ({
      ...data,
      username: usersMap[data.id].login,
      avatar: updateResourcePath(usersMap[data.id].avatar),
      order: i + 1,
    }))
    return mappedTable
  }
)

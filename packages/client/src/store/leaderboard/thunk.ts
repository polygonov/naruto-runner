import { createAsyncThunk } from '@reduxjs/toolkit'
import { leaderboardApi } from '../../api/leaderboard'
import type {
  AddToLeaderboardPayload,
  RequestLeaderboardPayload,
} from '../../api/leaderboard/types'

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
    return table
  }
)

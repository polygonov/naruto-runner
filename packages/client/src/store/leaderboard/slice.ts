import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { addToLeaderboard, requestLeaderboard } from './thunk'
import { GENERAL_ERROR } from '../../constant'
import type { LeaderboardListRecord } from '../../api/leaderboard/types'

export type LeaderboardState = {
  isLeaderboardLoading: boolean
  leaderboardError: string | null
  leaderboardList: LeaderboardListRecord[]
}

const initialState: LeaderboardState = {
  isLeaderboardLoading: false,
  leaderboardError: null,
  leaderboardList: [],
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestLeaderboard.fulfilled, (state, { payload }) => {
      state.leaderboardList = payload.map(({ data }, i) => ({
        ...data,
        order: i + 1,
      }))
    })
    builder.addMatcher(
      isPending(addToLeaderboard, requestLeaderboard),
      state => {
        state.isLeaderboardLoading = true
        state.leaderboardError = null
      }
    )
    builder.addMatcher(
      isFulfilled(addToLeaderboard, requestLeaderboard),
      state => {
        state.isLeaderboardLoading = false
        state.leaderboardError = null
      }
    )
    builder.addMatcher(
      isRejected(addToLeaderboard, requestLeaderboard),
      (state, { error }) => {
        state.isLeaderboardLoading = false
        state.leaderboardError = error.message ?? GENERAL_ERROR
      }
    )
  },
})

export default leaderboardSlice.reducer

import {
  createSlice,
  isFulfilled,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { GENERAL_ERROR } from '../../constant'
import { Topic, TopicsList } from '../../api/forum/types'
import {
  createComment,
  createTopic,
  requestTopic,
  requestTopics,
} from './thunk'

export type ForumState = {
  createTopicError: string | null
  createCommentError: string | null
  isTopicsLoading: boolean
  topicsError: string | null
  topicsList: TopicsList
  isCurrentTopicLoading: boolean
  currentTopicError: string | null
  currentTopic: Topic | null
}

const initialState: ForumState = {
  createTopicError: null,
  createCommentError: null,
  isTopicsLoading: false,
  topicsError: null,
  topicsList: [],
  isCurrentTopicLoading: false,
  currentTopicError: null,
  currentTopic: null,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setTopicsList: (state, { payload }: PayloadAction<TopicsList>) => {
      state.topicsList = payload
    },
    setCurrentTopic: (state, { payload }: PayloadAction<Topic>) => {
      state.currentTopic = payload
    },
    resetErrorsAndStatuses: state => {
      state.isTopicsLoading = false
      state.topicsError = null
      state.isCurrentTopicLoading = false
      state.currentTopicError = null
    },
    resetForumState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(requestTopics.pending, state => {
      state.isTopicsLoading = true
      state.topicsError = null
    })
    builder.addCase(requestTopics.rejected, state => {
      state.isTopicsLoading = false
      state.topicsError = GENERAL_ERROR
    })
    builder.addCase(requestTopic.pending, state => {
      state.isCurrentTopicLoading = true
      state.currentTopicError = null
    })
    builder.addCase(requestTopic.rejected, state => {
      state.isCurrentTopicLoading = false
      state.currentTopicError = GENERAL_ERROR
    })
    builder.addMatcher(
      isFulfilled(requestTopics),
      (state, { payload }: PayloadAction<TopicsList>) => {
        state.isTopicsLoading = false
        state.topicsList = payload
      }
    )
    builder.addMatcher(
      isFulfilled(requestTopic),
      (state, { payload }: PayloadAction<Topic>) => {
        state.isCurrentTopicLoading = false
        state.currentTopic = payload
      }
    )
    builder.addMatcher(isFulfilled(createTopic), state => {
      state.createTopicError = null
    })
    builder.addMatcher(
      isFulfilled(createComment),
      (state, { payload }: PayloadAction<Topic>) => {
        state.createCommentError = null
        state.currentTopic = payload
      }
    )
    builder.addMatcher(isRejected(createComment), (state, { error }) => {
      state.createCommentError = error.message ?? GENERAL_ERROR
    })
    builder.addMatcher(isRejected(createTopic), (state, { error }) => {
      state.createTopicError = error.message ?? GENERAL_ERROR
    })
  },
})

export default forumSlice.reducer

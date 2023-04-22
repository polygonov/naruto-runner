import type { AppState } from '../index'

export const selectForumState = (state: AppState) => state.forum
export const selectTopicsList = (state: AppState) => state.forum.topicsList
export const selectCurrentTopic = (state: AppState) => state.forum.currentTopic

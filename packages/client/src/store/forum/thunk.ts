import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  CreateCommentPayload,
  CreateTopicPayload,
  RequestTopicsPayload,
} from '../../api/forum/types'
import { forumApi } from '../../api/forum'

export const requestTopics = createAsyncThunk(
  'forum/requestTopics',
  async (payload: RequestTopicsPayload = {}) => {
    const topics = await forumApi.requestTopics(payload)
    return topics
  }
)

export const requestTopic = createAsyncThunk(
  'forum/requestTopic',
  async (id: number) => {
    const topic = await forumApi.requestTopic(id)
    return topic
  }
)

export const createTopic = createAsyncThunk(
  'forum/createTopic',
  async (payload: CreateTopicPayload) => {
    const topic = await forumApi.createTopic(payload)
    return topic
  }
)

export const createComment = createAsyncThunk(
  'forum/createComment',
  async (payload: CreateCommentPayload) => {
    const topic = await forumApi.createComment(payload)
    return topic
  }
)

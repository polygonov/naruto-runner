import {
  AsyncThunk,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import type { ApiErrorResponse } from '../../api/types'

type AsyncThunkConfig = {
  rejectValue?: string
  serializedErrorType?: ApiErrorResponse
}

const handleThunkRejection = <ThunkArg, Returned>(
  fn: (args: ThunkArg) => Promise<Returned>
): AsyncThunkPayloadCreator<Returned, ThunkArg> => {
  return async (payload: ThunkArg, { rejectWithValue }) => {
    try {
      const result = await fn(payload)
      return result
    } catch (err) {
      return rejectWithValue((err as ApiErrorResponse).reason)
    }
  }
}

export const createThunk = <ThunkArg, Returned>(
  typePrefix: string,
  fn: (args: ThunkArg) => Promise<Returned>
): AsyncThunk<Returned, ThunkArg, AsyncThunkConfig> =>
  createAsyncThunk<Returned, ThunkArg, AsyncThunkConfig>(
    typePrefix,
    handleThunkRejection<ThunkArg, Returned>(fn)
  )

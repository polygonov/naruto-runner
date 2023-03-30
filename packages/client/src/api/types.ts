import type { HttpMethod } from './constants'

export type ApiErrorResponse = {
  reason: string
}

export type ContentType = 'json' | 'form-data'

export type ParamsType = Record<string, string | number | boolean>

export type RequestOptions = {
  data?: Record<string, string | Blob | File | unknown>
  method?: HttpMethod
  contentType?: ContentType
  /** При успехе автоматически применяет метод .json() и возвращает готовый ответ */
  shouldParseResponse?: boolean
  params?: ParamsType
}

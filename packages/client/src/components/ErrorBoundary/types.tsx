import { ErrorInfo } from 'react'

export interface Props {
  children: any
}

export interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

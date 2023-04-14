import type { ErrorInfo } from 'react'
import { GENERAL_ERROR } from '../../constant'
import * as React from 'react'

import type { Props, State } from './types'

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  public override state: State = {
    error: null,
    errorInfo: null,
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
  }

  public override render() {
    const { children } = this.props

    if (this.state.errorInfo) {
      return (
        <>
          <h2>{GENERAL_ERROR}</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </>
      )
    }

    return children
  }
}

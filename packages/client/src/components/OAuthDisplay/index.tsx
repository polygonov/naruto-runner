import type { FC } from 'react'
import { memo } from 'react'
import classNames from 'classnames'
import { YandexOAuthButton } from '../YandexOAuthButton'
import './index.css'

export type OAuthDisplayButtonInjectedProps = {
  view?: 'full' | 'icon'
}

type OAuthButton = {
  Component: FC<OAuthDisplayButtonInjectedProps>
  key: string
}

const buttons: OAuthButton[] = [
  { Component: YandexOAuthButton, key: 'YandexOAuth' },
]

const isMultiple = buttons.length > 1

type OAuthDisplayProps = {
  className?: string
}

export const OAuthDisplay: FC<OAuthDisplayProps> = memo(({ className }) => {
  return (
    <div className={classNames('oauth-display', className)}>
      <span className="oauth-display__hint">
        {isMultiple ? 'или войти с помощью' : 'или'}
      </span>
      <div className="oauth-display__buttons">
        {buttons.map(({ Component, key }) => (
          <Component key={key} view={isMultiple ? 'icon' : 'full'} />
        ))}
      </div>
    </div>
  )
})

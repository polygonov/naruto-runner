import { Fragment } from 'react'
import './index.css'
import { Button } from '../../../Button'
import { ActualScreen } from '../../engine/EngineOptions'
import { GameComponentProps } from '../types/GameComponentProps'

export function StartGameComponent({ onChange }: GameComponentProps) {
  const submitHandler = () => {
    onChange(ActualScreen.gameScreen)
  }

  return (
    <Fragment>
      <div className="startScreen"></div>
      <div className="content">
        <Button text="Старт" type="submit" onClick={submitHandler} />
      </div>
    </Fragment>
  )
}

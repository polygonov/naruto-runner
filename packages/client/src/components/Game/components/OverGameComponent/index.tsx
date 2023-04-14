import { Fragment } from 'react'
import './index.css'
import { Button } from '../../../Button'
import { Actual } from '../..'
import { GameComponentProps } from '../StartGameComponent'

export function OverGameComponent({ onChange }: GameComponentProps) {
  const state = {
    focus: Actual.startScreen,
  }

  const submitHandler = () => {
    state.focus = Actual.gameScreen
    onChange(state.focus)
  }

  return (
    <Fragment>
      <div className="startScreen"></div>
      <div className="content">
        <Button text="Начать заново" type="submit" onClick={submitHandler} />
      </div>
    </Fragment>
  )
}

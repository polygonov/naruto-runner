import { Fragment } from 'react'
import './index.css'
import { Button } from '../../../Button'
import { Actual } from '../..'

export type GameComponentProps = {
  onChange: (value: Actual) => void
}

export function StartGameComponent({ onChange }: GameComponentProps) {
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
        <Button text="Старт" type="submit" onClick={submitHandler} />
      </div>
    </Fragment>
  )
}

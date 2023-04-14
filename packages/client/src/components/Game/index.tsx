import { useState } from 'react'
import { CanvasComponent } from './components/CanvasComponent'
import { StartGameComponent } from './components/StartGameComponent'
import './index.css'
import { OverGameComponent } from './components/OverGameComponent'

export enum Actual {
  startScreen,
  gameScreen,
  overScreen,
}

export function GameEngine() {
  const [screen, setScreen] = useState(Actual.startScreen)

  const handleChange = (value: Actual) => {
    setScreen(value)
  }

  return (
    <div className="game">
      {screen === Actual.startScreen && (
        <StartGameComponent onChange={handleChange} />
      )}
      {screen === Actual.gameScreen && (
        <CanvasComponent onChange={handleChange} />
      )}
      {screen === Actual.overScreen && (
        <OverGameComponent onChange={handleChange} />
      )}
    </div>
  )
}

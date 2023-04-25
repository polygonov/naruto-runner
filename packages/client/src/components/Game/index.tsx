import { useState } from 'react'
import { CanvasComponent } from './components/CanvasComponent'
import { StartGameComponent } from './components/StartGameComponent'
import './index.css'
import { OverGameComponent } from './components/OverGameComponent'
import { ActualScreen } from './engine/EngineOptions'

export function GameEngine() {
  const [screen, setScreen] = useState(ActualScreen.startScreen)
  const handleScreenChange = (value: ActualScreen) => {
    setScreen(value)
  }

  const [score, setScore] = useState(0)
  const handleScoreChange = (value: number) => {
    setScore(value)
  }

  return (
    <div className="game">
      {screen === ActualScreen.startScreen && (
        <StartGameComponent onChange={handleScreenChange} />
      )}
      {screen === ActualScreen.gameScreen && (
        <CanvasComponent
          onChange={handleScreenChange}
          onScoreChange={handleScoreChange}
        />
      )}
      {screen === ActualScreen.overScreen && (
        <OverGameComponent onChange={handleScreenChange} score={score} />
      )}
    </div>
  )
}

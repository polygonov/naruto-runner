import { Fragment } from 'react'
import { CanvasComponent } from './components/CanvasComponent'
import './index.css'
export function GameEngine() {
  return (
    <Fragment>
      <div className="game">
        <CanvasComponent />
      </div>
    </Fragment>
  )
}

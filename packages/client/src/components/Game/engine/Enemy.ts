import frogs from '../../../assets/images/game/frogs.png'
import { EngineSettings } from './EngineSettings'
import { VisualItem } from './VisualItem'

export class Enemy extends VisualItem {
  private frame = 0
  private topOffset = 300
  isDied = false
  constructor(context: CanvasRenderingContext2D) {
    super(context)
    const varietyOfEnemy = 4
    this.frame = this.width * Math.floor(Math.random() * varietyOfEnemy)
  }

  protected init(): void {
    this.image.src = frogs
    this.width = 120
    this.height = 90
    this.framerate = 10
    this.startTime = performance.now()
  }

  draw = () => {
    const deltaX = 10
    const movement = this.step * deltaX
    this.context.drawImage(
      this.image,
      this.frame,
      0,
      this.width,
      this.height,
      EngineSettings.canvasWidth - movement,
      this.topOffset,
      this.width,
      this.height
    )
    this.step++
    if (movement < EngineSettings.canvasWidth + this.width) {
      requestAnimationFrame(this.draw)
    } else {
      this.isDied = true
    }
  }
}

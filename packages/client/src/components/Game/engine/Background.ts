import gameBackground from '../../../assets/images/game/game-background.png'
import { EngineSettings, EngineStatus } from './EngineOptions'
import { VisualItem } from './VisualItem'

export class Background extends VisualItem {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  protected init(): void {
    this.image.src = gameBackground
    this.width = EngineSettings.canvasWidth
    this.height = EngineSettings.canvasHeight
    this.framerate = 10
    this.startTime = performance.now()
  }

  draw = () => {
    const deltaX = 15
    let movement = this.step * deltaX
    if (movement > this.width) {
      movement = movement % this.width
    }
    this.context.drawImage(this.image, -movement, 0, this.width, this.height)
    this.context.drawImage(
      this.image,
      this.width - movement,
      0,
      this.width,
      this.height
    )
    this.step++
    if (this.status === EngineStatus.Running) {
      requestAnimationFrame(this.draw)
    }
  }
}

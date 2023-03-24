import gameBackground from '../../../assets/images/game/game-background.png'
import { EngineSettings, EngineStatus } from './EngineOptions'
import { VisualItem } from './VisualItem'

export class Background extends VisualItem {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  private deltaX = 15
  private maxDelta = 55
  private factor = 0.001

  protected init(): void {
    this.image.src = gameBackground
    this.width = EngineSettings.canvasWidth
    this.height = EngineSettings.canvasHeight
    this.framerate = 10
    this.startTime = performance.now()
  }

  draw = () => {
    const deltaX = this.deltaX
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
    if (this.deltaX < this.maxDelta) {
      this.deltaX += this.factor
    }
    if (this.status === EngineStatus.Running) {
      requestAnimationFrame(this.draw)
    }
  }
}

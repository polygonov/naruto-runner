import gameBackground from '../../../assets/images/game/game-background.png'
import { VisualItem } from './VisualItem'

export class Background extends VisualItem {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  protected init(): void {
    this.image.src = gameBackground
    this.width = 1440
    this.height = 400
    this.framerate = 10
    this.startTime = performance.now()
  }

  draw = () => {
    const deltaX = 10
    const time = performance.now()
    const progress = time - this.startTime
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
    requestAnimationFrame(this.draw)
    if (progress >= this.framerate) {
      this.startTime = performance.now()
      this.step++
    }
  }
}

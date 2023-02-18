import gameBackground from '../../../assets/images/game/game-background.png'
import { VisualItem } from './VisualItem'

export class Background extends VisualItem {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  init(): void {
    this.image.src = gameBackground
    this.width = 1440
    this.height = 400
  }

  draw(step: number) {
    let movement = step * 10
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
  }
}

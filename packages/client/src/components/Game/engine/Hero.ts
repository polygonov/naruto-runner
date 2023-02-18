import hero from '../../../assets/images/game/naruto.png'
import { VisualItem } from './VisualItem'

export class Hero extends VisualItem {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  init(): void {
    this.image.src = hero
    this.width = 250
    this.height = 250
  }

  draw(step: number) {
    const offsetLeft = 150
    const offsetTop = 50
    let movement = step * this.width
    if (movement > this.width * 6) {
      movement = (step % 6) * this.width
    }
    this.context.drawImage(
      this.image,
      movement,
      0,
      this.width,
      this.height,
      offsetTop,
      offsetLeft,
      this.width,
      this.width
    )
  }
}

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
    this.framerate = 70
    this.startTime = performance.now()
  }

  draw = () => {
    const offsetLeft = 150
    const offsetTop = 50
    const frames = 6
    const time = performance.now()
    const progress = time - this.startTime
    let movement = this.step * this.width
    if (movement >= this.width * frames) {
      movement = (this.step % frames) * this.width
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
    requestAnimationFrame(this.draw)
    if (progress >= this.framerate) {
      this.startTime = performance.now()
      this.step++
    }
  }
}

import hero from '../../../assets/images/game/naruto.png'
import heroJump from '../../../assets/images/game/naruto-jump.png'
import { VisualItem } from './VisualItem'

enum Action {
  Up,
  Down,
  Run,
}

export class Hero extends VisualItem {
  private stepsLimit = 10
  private startStep = 0
  private jumpFrames = 20
  private action = Action.Run
  constructor(context: CanvasRenderingContext2D) {
    super(context)
    window.addEventListener('keydown', this.onKeyDown)
  }

  protected init(): void {
    this.image.src = hero
    this.width = 160
    this.height = 160
    this.framerate = 70
    this.startTime = performance.now()
  }

  draw = () => {
    if (this.action === Action.Run) {
      this.run()
    } else {
      this.jump()
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.action === Action.Run && event.code === 'Space') {
      console.log('space')
      this.action = Action.Up
    }
  }

  private run() {
    const offsetTop = 220
    const offsetLeft = 100
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
      offsetLeft,
      offsetTop,
      this.width,
      this.width
    )
    requestAnimationFrame(this.draw)
    if (progress >= this.framerate) {
      this.startTime = performance.now()
      this.step++
    }
  }

  private jump() {
    this.image.src = heroJump
    if (this.action === Action.Up) {
      this.up()
    } else {
      this.down()
    }
  }

  private up() {
    const topFreezeFrames = 10
    const offsetTop = 220
    const offsetLeft = 100
    const movePartial = 10
    let frame = 0
    if (!this.startStep) {
      this.startStep = this.step
    }
    const progress = this.step - this.startStep
    let movement = progress * this.jumpFrames
    if (progress > this.stepsLimit) {
      movement = this.stepsLimit * this.jumpFrames
    }
    if (progress < this.stepsLimit / movePartial) {
      frame = 320
    }
    this.context.drawImage(
      this.image,
      frame,
      0,
      this.width,
      this.height,
      offsetLeft,
      offsetTop - movement,
      this.width,
      this.width
    )
    this.step++
    if (progress > this.stepsLimit + topFreezeFrames) {
      this.action = Action.Down
      this.startStep = this.step
    }
    requestAnimationFrame(this.draw)
  }

  private down() {
    const progress = this.step - this.startStep
    const movement = progress * this.jumpFrames
    const offsetLeft = 100
    const movePartial = 10
    let frame = 160
    if (progress > this.stepsLimit / movePartial) {
      frame = 320
    }
    this.context.drawImage(
      this.image,
      frame,
      0,
      this.width,
      this.height,
      offsetLeft,
      movement,
      this.width,
      this.width
    )
    this.step++
    if (progress > this.stepsLimit) {
      this.action = Action.Run
      this.image.src = hero
      this.startStep = 0
    }
    requestAnimationFrame(this.draw)
  }
}

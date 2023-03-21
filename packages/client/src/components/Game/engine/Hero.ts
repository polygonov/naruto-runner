import hero from '../../../assets/images/game/naruto.png'
import heroJump from '../../../assets/images/game/naruto-jump.png'
import { VisualItem } from './VisualItem'
import { Rect } from './CollisionDetector'
import { EngineStatus } from './EngineOptions'

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
  rect: Rect = { x: 0, x1: 0, y: 0, y1: 0 }

  constructor(context: CanvasRenderingContext2D) {
    super(context)
    window.addEventListener('keydown', this.onKeyDown)
    const offset = 70
    this.rect.x = 100
    this.rect.x1 = this.rect.x + this.width - offset
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
      this.action = Action.Up
    }
  }

  private run() {
    const offsetTop = 220
    const frames = 6
    this.rect.y = offsetTop
    this.rect.y1 = this.rect.y + this.height
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
      this.rect.x,
      offsetTop,
      this.width,
      this.width
    )
    if (progress >= this.framerate) {
      this.startTime = performance.now()
      this.step++
    }
    if (this.status === EngineStatus.Running) {
      requestAnimationFrame(this.draw)
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
    const collisionOffset = 50
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
    this.rect.y = offsetTop - movement
    this.rect.y1 = this.rect.y + this.height - collisionOffset
    this.context.drawImage(
      this.image,
      frame,
      0,
      this.width,
      this.height,
      this.rect.x,
      this.rect.y,
      this.width,
      this.width
    )
    this.step++
    if (progress > this.stepsLimit + topFreezeFrames) {
      this.action = Action.Down
      this.startStep = this.step
    }
    if (this.status === EngineStatus.Running) {
      requestAnimationFrame(this.draw)
    }
  }

  private down() {
    const collisionOffset = 50
    const progress = this.step - this.startStep
    const movement = progress * this.jumpFrames
    const movePartial = 10
    this.rect.y = movement
    this.rect.y1 = this.rect.y + this.height - collisionOffset
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
      this.rect.x,
      this.rect.y,
      this.width,
      this.width
    )
    this.step++
    if (progress > this.stepsLimit) {
      this.action = Action.Run
      this.image.src = hero
      this.startStep = 0
    }
    if (this.status === EngineStatus.Running) {
      requestAnimationFrame(this.draw)
    }
  }
}

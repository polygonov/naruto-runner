import frogs from '../../../assets/images/game/frogs.png'
import { CollisionDetector, Rect } from './CollisionDetector'
import { EngineSettings, EngineStatus } from './EngineOptions'
import { VisualItem } from './VisualItem'

const enemyHeight = 90

export class Enemy extends VisualItem {
  private frame = 0
  private topOffset = 300
  isDied = false
  rect: Rect = {
    x: EngineSettings.canvasWidth,
    x1: EngineSettings.canvasWidth + this.topOffset,
    y: 0,
    y1: 0,
  }
  constructor(
    context: CanvasRenderingContext2D,
    private collisionDetector: CollisionDetector
  ) {
    super(context)
    const varietyOfEnemy = 4
    this.frame = this.width * Math.floor(Math.random() * varietyOfEnemy)
    this.rect.y = this.topOffset
    this.rect.y1 = this.topOffset + enemyHeight
  }

  protected init(): void {
    this.image.src = frogs
    this.width = 120
    this.height = enemyHeight
    this.framerate = 10
    this.startTime = performance.now()
  }

  draw = () => {
    const deltaX = 15
    const offsetLeft = 10
    const offsetRight = 40
    const movement = this.step * deltaX
    this.rect.x = EngineSettings.canvasWidth - movement + offsetLeft
    this.rect.x1 = this.rect.x + this.width - offsetRight
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
    this.collisionDetector.intersects(this.rect)
    if (
      movement < EngineSettings.canvasWidth + this.width &&
      this.status === EngineStatus.Running
    ) {
      requestAnimationFrame(this.draw)
    } else {
      this.isDied = true
    }
  }
}

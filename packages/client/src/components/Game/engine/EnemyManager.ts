import { CollisionDetector } from './CollisionDetector'
import { Enemy } from './Enemy'
import { EngineStatus } from './EngineOptions'
import { Hero } from './Hero'

export class EnemyManager {
  private enemyList: Enemy[] = []
  private startTime = 0
  private minFramerate = 700
  private maxFramerate = 2500
  private deltaX = 15
  private maxDelta = 55
  private factor = 0.002
  private collisionDetector: CollisionDetector | undefined
  status: EngineStatus = EngineStatus.Running

  constructor(protected context: CanvasRenderingContext2D, private hero: Hero) {
    this.startTime = performance.now()
    this.collisionDetector = new CollisionDetector(hero)
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  private frameRate = this.getRandomInt(this.minFramerate, this.maxFramerate)
  generate = () => {
    const time = performance.now()
    const progress = time - this.startTime
    if (progress >= this.frameRate && this.collisionDetector !== undefined) {
      this.startTime = performance.now()
      this.frameRate = this.getRandomInt(this.minFramerate, this.maxFramerate)
      const newEnemy = new Enemy(
        this.context,
        this.collisionDetector,
        this.deltaX
      )
      this.enemyList.push(newEnemy)
      if (this.status === EngineStatus.Running) {
        requestAnimationFrame(newEnemy.draw)
      }
      this.enemyList.forEach((enemy, index, array) => {
        if (enemy.isDied) {
          array.splice(index, 1)
        }
        if (this.collisionDetector) {
          this.collisionDetector.intersects(enemy.rect)
        }
      }, this.enemyList)
    }
    if (
      this.collisionDetector &&
      !this.collisionDetector.isGameOver &&
      this.status === EngineStatus.Running
    ) {
      requestAnimationFrame(this.generate)
    } else {
      this.status = EngineStatus.Unmounted
      this.enemyList.forEach(enemy => {
        enemy.status = EngineStatus.Unmounted
      }, this.enemyList)
    }
    if (this.deltaX < this.maxDelta) {
      this.deltaX += this.factor
    }
  }
}

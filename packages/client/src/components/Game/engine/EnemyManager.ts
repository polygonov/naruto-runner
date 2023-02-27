import { Enemy } from './Enemy'

export class EnemyManager {
  private isGameOver = false
  private enemyList: Enemy[] = []
  private startTime = 0
  private minFramerate = 700

  constructor(protected context: CanvasRenderingContext2D) {
    setTimeout(() => {
      this.isGameOver = true
    }, 100000)
    this.startTime = performance.now()
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  private frameRate = this.getRandomInt(this.minFramerate, 2500)
  generate = () => {
    const time = performance.now()
    const progress = time - this.startTime
    if (progress >= this.frameRate) {
      this.startTime = performance.now()
      this.frameRate = this.getRandomInt(this.minFramerate, 2500)
      const newEnemy = new Enemy(this.context)
      this.enemyList.push(newEnemy)
      requestAnimationFrame(newEnemy.draw)
      this.enemyList.forEach((enemy, index, array) => {
        if (enemy.isDied) {
          array.splice(index, 1)
        }
      }, this.enemyList)
    }
    if (!this.isGameOver) {
      requestAnimationFrame(this.generate)
    }
  }

  detectCollision() {
    // todo
  }
}

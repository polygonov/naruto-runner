import { Background } from './Background'
import { EnemyManager } from './EnemyManager'
import { EngineStatus } from './EngineOptions'
import { Hero } from './Hero'

export class Engine {
  private static instance: Engine
  private enemyManager: EnemyManager
  private background: Background
  private hero: Hero

  constructor(context: CanvasRenderingContext2D) {
    this.background = new Background(context)
    this.hero = new Hero(context)
    this.enemyManager = new EnemyManager(context, this.hero)
    this.background.draw()
    this.enemyManager.generate()
    this.hero.draw()
    this.checkStatus()
  }

  public static getInstance(context: CanvasRenderingContext2D): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine(context)
    }
    return Engine.instance
  }

  private checkStatus = () => {
    if (this && this.enemyManager !== undefined) {
      if (this.enemyManager.status === EngineStatus.Unmounted) {
        this.background.status = EngineStatus.Unmounted
        this.hero.status = EngineStatus.Unmounted
      } else {
        this.background.status = EngineStatus.Running
        this.hero.status = EngineStatus.Running
      }
    }
    if (this) {
      requestAnimationFrame(this.checkStatus)
    }
  }
}

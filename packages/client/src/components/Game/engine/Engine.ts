import { Background } from './Background'
import { EnemyManager } from './EnemyManager'
import { EngineStatus } from './EngineOptions'
import { Action, Hero } from './Hero'
import { VisualItem } from './VisualItem'

export class Engine {
  private static instance: Engine
  private enemyManager: EnemyManager
  private background: Background
  private hero: Hero
  private visualItems: VisualItem[] = []

  constructor(context: CanvasRenderingContext2D, private callback: () => void) {
    this.background = new Background(context)
    this.hero = new Hero(context)
    this.visualItems.push(this.background, this.hero)
    this.enemyManager = new EnemyManager(context, this.hero)
    this.background.draw()
    this.enemyManager.generate()
    this.hero.draw()
    this.checkStatus()
  }

  restart(context: CanvasRenderingContext2D) {
    this.visualItems = []
    this.background = new Background(context)
    this.hero = new Hero(context)
    this.visualItems.push(this.background, this.hero)
    this.enemyManager = new EnemyManager(context, this.hero)
    this.background.draw()
    this.enemyManager.generate()
    this.hero.draw()
  }

  public static getInstance(
    context: CanvasRenderingContext2D,
    callback: () => void
  ): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine(context, callback)
    }
    return Engine.instance
  }

  private checkStatus = () => {
    if (this.enemyManager !== undefined) {
      if (this.enemyManager.status === EngineStatus.Unmounted) {
        this.visualItems.forEach(item => (item.status = EngineStatus.Unmounted))
        this.callback()
      } else {
        this.visualItems.forEach(item => (item.status = EngineStatus.Running))
      }
    }
    requestAnimationFrame(this.checkStatus)
  }

  mount() {
    window.addEventListener('keydown', this.onKeyDown)
  }

  unmount() {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (this.hero.action === Action.Run && event.code === 'Space') {
      this.hero.action = Action.Up
    }
  }
}

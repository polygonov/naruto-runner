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
  private startTime = 0
  private limit = 250
  private playerScore = 0

  constructor(
    context: CanvasRenderingContext2D,
    private statusCallback: () => void,
    private resultCallback: (value: number) => void
  ) {
    this.startTime = performance.now()
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

  updateCallback(resultCallback: (value: number) => void) {
    this.playerScore = 0
    this.startTime = performance.now()
    this.resultCallback = resultCallback
  }

  public static getInstance(
    context: CanvasRenderingContext2D,
    statusCallback: () => void,
    resultCallback: (value: number) => void
  ): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine(context, statusCallback, resultCallback)
    }
    return Engine.instance
  }

  private checkStatus = () => {
    if (this.enemyManager !== undefined) {
      if (this.enemyManager.status === EngineStatus.Unmounted) {
        this.visualItems.forEach(item => (item.status = EngineStatus.Unmounted))
        this.statusCallback()
      } else {
        this.visualItems.forEach(item => (item.status = EngineStatus.Running))
        const time = performance.now()
        const progress = time - this.startTime
        if (progress >= this.limit) {
          this.playerScore++
          this.resultCallback(this.playerScore)
          this.startTime = performance.now()
        }
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

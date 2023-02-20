export abstract class VisualItem {
  protected image = new Image()
  protected width = 0
  protected height = 0
  protected step = 0
  protected startTime = 0
  protected framerate = 0

  constructor(protected context: CanvasRenderingContext2D) {
    this.init()
  }

  protected abstract init(): void

  abstract draw(): void
}

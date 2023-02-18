export abstract class VisualItem {
  protected width = 0
  protected height = 0

  constructor(protected context: CanvasRenderingContext2D) {
    this.init()
  }

  abstract init(): void

  abstract draw(step: number): void
}

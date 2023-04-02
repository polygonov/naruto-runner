import { Hero } from './Hero'

export type Rect = { x: number; x1: number; y: number; y1: number }

export class CollisionDetector {
  isGameOver = false
  constructor(private hero: Hero) {}

  private interCheck(a: number, b: number, c: number, d: number): boolean {
    return (a >= c && a <= d) || (b >= c && b <= d)
  }

  intersects(enemyRect: Rect) {
    const heroRect = this.hero.rect
    const s1 = this.interCheck(
      enemyRect.x,
      enemyRect.x1,
      heroRect.x,
      heroRect.x1
    )
    const s2 = this.interCheck(
      enemyRect.y,
      enemyRect.y1,
      heroRect.y,
      heroRect.y1
    )
    const s3 = this.interCheck(
      heroRect.x,
      heroRect.x1,
      enemyRect.x,
      enemyRect.x1
    )
    const s4 = this.interCheck(
      heroRect.y,
      heroRect.y1,
      enemyRect.y,
      enemyRect.y1
    )
    const isCollision = (s1 && s2) || (s3 && s4) || (s1 && s4) || (s3 && s2)
    if (isCollision) {
      this.isGameOver = true
    }
  }
}

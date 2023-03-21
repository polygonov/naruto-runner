import { Hero } from './Hero'

export type Rect = { x: number; x1: number; y: number; y1: number }

export class CollisionDetector {
  isGameOver = false
  constructor(private hero: Hero) {}

  intersects(enemyRect: Rect) {
    const heroRect = this.hero.rect
    const s1 =
      (enemyRect.x >= heroRect.x && enemyRect.x <= heroRect.x1) ||
      (enemyRect.x1 >= heroRect.x && enemyRect.x1 <= heroRect.x1)
    const s2 =
      (enemyRect.y >= heroRect.y && enemyRect.y <= heroRect.y1) ||
      (enemyRect.y1 >= heroRect.y && enemyRect.y1 <= heroRect.y1)
    const s3 =
      (heroRect.x >= enemyRect.x && heroRect.x <= enemyRect.x1) ||
      (heroRect.x1 >= enemyRect.x && heroRect.x1 <= enemyRect.x1)
    const s4 =
      (heroRect.y >= enemyRect.y && heroRect.y <= enemyRect.y1) ||
      (heroRect.y1 >= enemyRect.y && heroRect.y1 <= enemyRect.y1)
    const isCollision = (s1 && s2) || (s3 && s4) || (s1 && s4) || (s3 && s2)
    if (isCollision) {
      this.isGameOver = true
    }
  }
}

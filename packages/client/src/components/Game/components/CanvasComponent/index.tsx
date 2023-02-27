import './index.css'
import { useEffect, useRef } from 'react'
import { Background } from '../../engine/Background'
import { Hero } from '../../engine/Hero'
import { EnemyManager } from '../../engine/EnemyManager'
import { EngineSettings } from '../../engine/EngineSettings'

export type CustomCanvas = {
  getContext: (type: string) => CanvasRenderingContext2D
  width: number
  height: number
}

export function CanvasComponent() {
  const width = EngineSettings.canvasWidth
  const height = EngineSettings.canvasHeight
  const ref = useRef(null)

  useEffect(() => {
    const current: CustomCanvas = ref.current as unknown as CustomCanvas
    const context = current.getContext('2d')
    const background = new Background(context)
    const hero = new Hero(context)
    const enemyManager = new EnemyManager(context)
    background.draw()
    enemyManager.generate()
    hero.draw()
  }, [])

  return <canvas className="context" ref={ref} width={width} height={height} />
}
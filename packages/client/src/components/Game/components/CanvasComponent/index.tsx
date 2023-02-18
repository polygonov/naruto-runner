import './index.css'
import { useEffect, useRef } from 'react'
import { Background } from '../../engine/Background'
import { Hero } from '../../engine/Hero'

export type CustomCanvas = {
  getContext: (type: string) => CanvasRenderingContext2D
  width: number
  height: number
}

export function CanvasComponent() {
  const width = 1440
  const height = 400
  const ref = useRef(null)

  useEffect(() => {
    const current: CustomCanvas = ref.current as unknown as CustomCanvas
    const context = current.getContext('2d')
    const background = new Background(context)
    const hero = new Hero(context)
    let step = 0
    background.draw(step)
    hero.draw(step)
    setInterval(() => {
      background.draw(step)
      hero.draw(step)
      step++
    }, 50)
  }, [])

  return <canvas className="context" ref={ref} width={width} height={height} />
}
import { useEffect, useRef } from 'react'
import { EngineSettings } from '../../engine/EngineOptions'
import { Engine } from '../../engine/Engine'

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
    const engine = Engine.getInstance(context)
    engine.mount()
    return () => {
      engine.unmount()
    }
  }, [])

  return <canvas ref={ref} width={width} height={height} />
}

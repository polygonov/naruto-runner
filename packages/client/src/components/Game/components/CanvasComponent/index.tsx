import { useEffect, useRef } from 'react'
import { EngineSettings } from '../../engine/EngineOptions'
import { Engine } from '../../engine/Engine'
import { Actual } from '../..'
import { GameComponentProps } from '../StartGameComponent'

export type CustomCanvas = {
  getContext: (type: string) => CanvasRenderingContext2D
  width: number
  height: number
}

export function CanvasComponent({ onChange }: GameComponentProps) {
  const width = EngineSettings.canvasWidth
  const height = EngineSettings.canvasHeight
  const ref = useRef(null)
  const state = {
    focus: Actual.gameScreen,
  }

  const submitHandler = () => {
    state.focus = Actual.overScreen
    onChange(state.focus)
  }

  useEffect(() => {
    const current: CustomCanvas = ref.current as unknown as CustomCanvas
    const context = current.getContext('2d')
    const engine = Engine.getInstance(context, submitHandler)
    engine.mount()
    return () => {
      engine.unmount()
    }
  }, [])

  return <canvas ref={ref} width={width} height={height} />
}

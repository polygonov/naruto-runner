import { Fragment, useEffect, useRef, useState } from 'react'
import { ActualScreen, EngineSettings } from '../../engine/EngineOptions'
import { Engine } from '../../engine/Engine'
import './index.css'
import { GameComponentProps } from '../types/GameComponentProps'

export type CustomCanvas = {
  getContext: (type: string) => CanvasRenderingContext2D
  width: number
  height: number
}

export function CanvasComponent({
  onChange,
  onScoreChange,
}: GameComponentProps) {
  const width = EngineSettings.canvasWidth
  const height = EngineSettings.canvasHeight
  const ref = useRef(null)

  const [result, setResult] = useState(ActualScreen.startScreen)
  const handleResultChange = (value: number) => {
    setResult(value)
    if (onScoreChange) {
      onScoreChange(value)
    }
  }

  const submitHandler = () => {
    onChange(ActualScreen.overScreen)
  }

  useEffect(() => {
    const current: CustomCanvas = ref.current as unknown as CustomCanvas
    const context = current.getContext('2d')
    const engine = Engine.getInstance(
      context,
      submitHandler,
      handleResultChange
    )
    engine.updateCallback(handleResultChange)
    engine.restart(context)
    engine.mount()
    return () => {
      // todo fix restart when unmount
      engine.unmount()
    }
  }, [])

  return (
    <Fragment>
      <canvas ref={ref} width={width} height={height} />
      <label className="result">
        {result.toLocaleString('en-US', {
          minimumIntegerDigits: 5,
          useGrouping: false,
        })}
      </label>
    </Fragment>
  )
}

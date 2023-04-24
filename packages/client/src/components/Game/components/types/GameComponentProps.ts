import { ActualScreen } from '../../engine/EngineOptions'

export type GameComponentProps = {
  onChange: (value: ActualScreen) => void
  onScoreChange?: (value: number) => void
  score?: number
}

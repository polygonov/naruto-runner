import { Fragment } from 'react'
import './index.css'
import { Button } from '../../../Button'
import { useAppSelector } from '../../../../store'
import { selectUserData } from '../../../../store/user/selectors'
import { RATING_FIELD_NAME } from '../../../../constant'
import { leaderboardApi } from '../../../../api/leaderboard'
import { ActualScreen } from '../../engine/EngineOptions'
import { GameComponentProps } from '../types/GameComponentProps'

export function OverGameComponent({ onChange, score }: GameComponentProps) {
  const submitHandler = () => {
    onChange(ActualScreen.gameScreen)
  }

  const { user } = useAppSelector(selectUserData)
  const id = user?.id
  if (id && score) {
    const payload = {
      id,
      [RATING_FIELD_NAME]: score,
    }
    leaderboardApi.addToLeaderboard(payload)
  }

  return (
    <Fragment>
      <div className="startScreen"></div>
      <div className="content">
        <p className="score">
          Ваш результат:{' '}
          {(score || 0).toLocaleString('en-US', {
            minimumIntegerDigits: 5,
            useGrouping: false,
          })}
        </p>
        <Button text="Начать заново" type="submit" onClick={submitHandler} />
      </div>
    </Fragment>
  )
}

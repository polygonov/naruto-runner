import { Button } from '../Button'
import { LeaderView } from './LeaderView'
import { Title } from '../Title'
import type { LeaderboardListRecord } from '../../api/leaderboard/types'
import './index.css'

const title = 'лидерборд'

type LeaderboardTableProps = {
  user?: LeaderboardListRecord | null
  leaderboardList: LeaderboardListRecord[]
}

export function LeaderboardTable({
  user,
  leaderboardList,
}: LeaderboardTableProps) {
  return (
    <div className="board">
      <Title className="board__title" text={title} />

      <div className="board__info">
        <div>№</div>
        <div>Игрок</div>
        <div>Результат</div>
      </div>

      {user && (
        <div className="board__user">
          <LeaderView
            order={user.order}
            avatar={user.avatar}
            username="Вы"
            score={user.score}
          />
        </div>
      )}

      <div className="board__list">
        {leaderboardList.map(player => {
          if (player.id !== user?.id) {
            return <LeaderView key={player.id} {...player} />
          }
        })}
      </div>

      <Button className="board__button" text="Начать игру" />
    </div>
  )
}

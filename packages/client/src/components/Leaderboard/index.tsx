import { Title } from '../Title'
import { Link } from '../Link'
import { LeaderView } from './LeaderView'
import type { LeaderboardListRecord } from '../../api/leaderboard/types'
import { RATING_FIELD_NAME, RoutesNameList } from '../../constant'
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
        <span>№</span>
        <span>Игрок</span>
        <span>Результат</span>
      </div>

      {user && (
        <div className="board__user">
          <LeaderView
            order={user.order}
            avatar={user.avatar}
            username="Вы"
            score={user[RATING_FIELD_NAME]}
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

      <Link
        className="board__button"
        text="Начать игру"
        view="primary"
        href={RoutesNameList.Game}
      />
    </div>
  )
}

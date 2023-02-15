import './LeaderboardTable.css'
import avatar from '../../assets/images/image-18.png'
import { Button } from '../Button'
import { Profile } from './Profile/Profile'
import { Title } from '../Title'
import { leaderboardList } from './leaderboardList'
const title = 'лидерборд'
export function LeaderboardTable() {
  return (
    <div className="board">
      <Title className={'board__title'} text={title} />
      <div className="board__info">
        <div>№</div>
        <div>Игрок</div>
        <div>Результат</div>
      </div>
      <div className="board__user">
        <Profile order={8} avatar={avatar} username={'Вы'} score={278} />
      </div>
      <div className="board__list">
        {leaderboardList.map(player => (
          <Profile key={player.order} {...player} />
        ))}
      </div>
      <Button className="board__button" text={'Начать игру'} />
    </div>
  )
}

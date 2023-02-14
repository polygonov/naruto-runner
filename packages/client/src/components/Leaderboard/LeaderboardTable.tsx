import './LeaderboardTable.css'
import avatar from '../../assets/images/image-18.png'
import { Button } from '../Button'
import { Profile } from './Profile/Profile'
export function LeaderboardTable() {
  return (
    <div className="board">
      <div className="board__title">ЛИДЕРБОРД</div>
      <div className="board__info">
        <div>№</div>
        <div>Игрок</div>
        <div>Результат</div>
      </div>
      <div className="board__user">
        <Profile order={8} avatar={avatar} username={'Вы'} score={278} />
      </div>
      <div className="board__list">
        <Profile order={1} avatar={avatar} username={'Игрок 1'} score={520} />
        <Profile order={2} avatar={avatar} username={'Игрок 2'} score={470} />
        <Profile order={3} avatar={avatar} username={'Игрок 3'} score={315} />
        <Profile order={4} avatar={avatar} username={'Игрок 4'} score={310} />
      </div>
      <Button className="board__button" text={'Начать игру'} />
    </div>
  )
}

import './Leaderboard.css'
import avatar from '../../assets/images/image-18.png'
import { Profile } from './Profile'
export function Leaderboard() {
  return (
    <div className="page">
      <div className="header"></div>
      <div className="content">
        <div className="board">
          <div className="title">ЛИДЕРБОРД</div>
          <div className="info">
            <div>№</div>
            <div>Игрок</div>
            <div>Результат</div>
          </div>
          <Profile order={8} avatar={avatar} username={'Вы'} score={278} />
          <div className="list">
            <Profile
              order={1}
              avatar={avatar}
              username={'Игрок 1'}
              score={520}
            />
            <Profile
              order={2}
              avatar={avatar}
              username={'Игрок 2'}
              score={470}
            />
            <Profile
              order={3}
              avatar={avatar}
              username={'Игрок 3'}
              score={315}
            />
          </div>
          <button className="button">Начать игру</button>
        </div>
      </div>
    </div>
  )
}

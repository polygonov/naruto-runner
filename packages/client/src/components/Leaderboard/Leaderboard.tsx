import './Leaderboard.css'
export function Leaderboard() {
  return (
    <div className="page">
      <div className="header"></div>
      <div className="content">
        <div className="board">
          <div className="title">ЛИДЕРБОРД</div>
          <div className="info">
            <div className="info-item">№</div>
            <div className="info-item">Игрок</div>
            <div className="info-item">Результат</div>
          </div>
        </div>
      </div>
    </div>
  )
}

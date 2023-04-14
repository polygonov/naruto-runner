import { Avatar } from '../../Avatar'
import './index.css'

export type LeaderViewProps = {
  order: number
  avatar: string | null
  username: string
  score: number
}

export function LeaderView({
  order,
  avatar,
  score,
  username,
}: LeaderViewProps) {
  return (
    <div className="player">
      <span className="player__number">{order}</span>
      <div className="player__profile">
        <Avatar src={avatar ?? ''} className="player__image" size="small" />
        <p className="player__name">{username}</p>
      </div>
      <span className="player__score">{score}</span>
    </div>
  )
}

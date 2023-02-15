import { Avatar } from '../../Avatar'
import './index.css'

export interface ProfileProps {
  order: number
  avatar: string
  username: string
  score: number
}

export function LeaderView(props: ProfileProps) {
  return (
    <div className="player">
      <div className="player__number">{props.order}</div>
      <div className="player__profile">
        <Avatar
          src={props.avatar}
          className={'player__profile_image'}
          size="small"
        />
        <div className="player__profile_name">{props.username}</div>
      </div>
      <div className="player__score">{props.score}</div>
    </div>
  )
}

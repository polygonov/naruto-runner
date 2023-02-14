import './Profile.css'

interface ProfileProps {
  order: number
  avatar: string
  username: string
  score: number
}

export function Profile(props: ProfileProps) {
  return (
    <div className="player">
      <div className="player__number">{props.order}</div>
      <div className="player__profile">
        <img className="player__profile_image" src={props.avatar} />
        <div className="player__profile_name">{props.username}</div>
      </div>
      <div className="player__score">{props.score}</div>
    </div>
  )
}

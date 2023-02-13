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
      <div className="number">{props.order}</div>
      <div className="profile">
        <img className="image" src={props.avatar} />
        <div className="name">{props.username}</div>
      </div>
      <div className="score">{props.score}</div>
    </div>
  )
}

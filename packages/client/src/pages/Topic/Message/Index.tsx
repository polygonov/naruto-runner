import { Avatar } from '../../../components/Avatar'
import { FC, memo } from 'react'
import './index.css'
import { useAppSelector } from '../../../store'
import { selectIsAuth } from '../../../store/auth/selectors'

export type MessageProps = {
  userName: string
  userAvatar: string
  text: string
  date: string
}
export const Message: FC<MessageProps> = memo(
  ({ userAvatar, userName, text, date }) => {
    const isAuth = useAppSelector(selectIsAuth)

    return (
      <div className="message-wrapper">
        <div className="user-wrapper">
          <Avatar size="small" src={isAuth ? userAvatar : ''} />
          <p className="user-name">{userName}</p>
        </div>

        <p className="message">{text}</p>
        <p className="send-time">{date}</p>
      </div>
    )
  }
)

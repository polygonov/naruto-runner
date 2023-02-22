import './index.css'
import { Avatar } from '../../../../components/Avatar'
import { FC, memo } from 'react'

export type MessageProps = {
  userName: string
  text: string
  date: string
}
export const Message: FC<MessageProps> = memo(({ userName, text, date }) => {
  return (
    <div className="message-wrapper">
      <div className="user-wrapper">
        <Avatar size="small" />
        <div className="user-name">{userName}</div>
      </div>

      <div className="message">{text}</div>
      <div className="send-time">{date}</div>
    </div>
  )
})

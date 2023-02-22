import { Message } from './Message/Index'
import { TypingPlace } from './TypingPlace'
import './index.css'

export function Chat() {
  const messageList = [
    {
      userName: 'Ivan',
      text: 'Не получается пройти уровень. Пробовал жать на пробел, но герой не прыгает так как я хочу',
      messageId: 1,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Laila',
      text: 'Жми на пробел сильнее и наклоняйся в сторону прыжка!',
      messageId: 2,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Jonh',
      text: 'Check yours ping and connection',
      messageId: 3,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Laila',
      text: 'Жми на пробел сильнее и наклоняйся в сторону прыжка!',
      messageId: 4,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Jonh',
      text: 'Check yours ping and connection',
      messageId: 5,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Laila',
      text: 'Жми на пробел сильнее и наклоняйся в сторону прыжка!',
      messageId: 6,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Jonh',
      text: 'Check yours ping and connection',
      messageId: 7,
      date: '22/02/2022 18.30',
    },
  ]
  const questionMessage = messageList.shift() as {
    userName: string
    text: string
    date: string
  }
  return (
    <div className="chat-wrapper">
      <div className="topic-message">
        {questionMessage && (
          <Message
            userName={questionMessage.userName}
            text={questionMessage.text}
            date={questionMessage.date}
          />
        )}
      </div>
      <ul className="topic-chat">
        {messageList.map(data => (
          <li key={data.messageId}>
            <Message {...data} />
          </li>
        ))}
      </ul>
      <TypingPlace />
    </div>
  )
}

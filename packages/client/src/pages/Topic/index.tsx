import { Message } from './Message/Index'
import { commentFormFields, TypingPlace } from './TypingPlace'
import './index.css'
import { useParams } from 'react-router'
import { useCallback, useEffect, useMemo } from 'react'
import { createComment, requestTopic } from '../../store/forum/thunk'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  selectCurrentTopic,
  selectForumState,
} from '../../store/forum/selectors'
import { updateResourcePath } from '../../utils/updateResourcePath'
import { selectUserData } from '../../store/user/selectors'

interface IMessage {
  userName: string
  text: string
  messageId: number
  date: string
}

export function Topic() {
  const dispatch = useAppDispatch()
  const { id: topicId } = useParams<{ id: string }>()
  const { user } = useAppSelector(selectUserData)
  const { createCommentError } = useAppSelector(selectForumState)

  useEffect(() => {
    if (topicId) {
      dispatch(requestTopic(Number(topicId)))
    }
  }, [dispatch, topicId])

  const topicData = useAppSelector(selectCurrentTopic)

  const { comments, author } = useMemo(() => {
    return {
      comments: topicData?.comments || [],
      author: topicData?.author || null,
    }
  }, [topicData])

  const handleAddComment = useCallback(
    (data: commentFormFields) => {
      if (user && topicData) {
        dispatch(
          createComment({ ...data, authorId: user.id, topicId: topicData.id })
        )
      }
    },
    [dispatch, topicData, user]
  )

  return (
    <div className="chat-wrapper">
      <div className="topic-message">
        <Message
          userAvatar={author?.avatar ? updateResourcePath(author.avatar)! : ''}
          userName={author?.login || '-'}
          text={topicData?.title || '-'}
          date={
            topicData?.createdAt
              ? new Date(topicData?.createdAt).toLocaleString()
              : '-'
          }
        />
      </div>
      <ul className="topic-chat">
        {comments.map(comment => (
          <li key={comment.id}>
            <Message
              userAvatar={
                comment.author.avatar
                  ? updateResourcePath(comment.author.avatar)!
                  : ''
              }
              userName={comment.author.login || '-'}
              text={comment.message || '-'}
              date={
                comment.createdAt
                  ? new Date(comment.createdAt).toLocaleString()
                  : '-'
              }
            />
          </li>
        ))}
      </ul>
      <TypingPlace
        handleAddComment={handleAddComment}
        serverError={createCommentError}
      />
    </div>
  )
}

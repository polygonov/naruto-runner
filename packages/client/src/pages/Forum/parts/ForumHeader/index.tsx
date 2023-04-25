import { AddTopic, AddTopicFormFields } from '../AddTopic'
import { SearchTopic } from '../SearchTopic'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../../../store'
import {
  selectIsAuth,
  selectIsCheckingAuth,
} from '../../../../store/auth/selectors'
import { useCallback } from 'react'
import { selectUserData } from '../../../../store/user/selectors'
import { createTopic, requestTopics } from '../../../../store/forum/thunk'
import { selectForumState } from '../../../../store/forum/selectors'

export function ForumHeader() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const { user } = useAppSelector(selectUserData)
  const { createTopicError } = useAppSelector(selectForumState)

  const handleAddTopic = useCallback(
    (data: AddTopicFormFields) => {
      if (user) {
        dispatch(createTopic({ ...data, authorId: user.id })).then(() => {
          dispatch(requestTopics())
        })
      }
    },
    [dispatch]
  )

  return (
    <div className="forum-header">
      {isAuth && (
        <AddTopic
          handleAddTopic={handleAddTopic}
          serverError={createTopicError}
        />
      )}
      <SearchTopic />
    </div>
  )
}

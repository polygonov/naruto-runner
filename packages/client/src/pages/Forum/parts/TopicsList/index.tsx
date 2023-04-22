import { Link } from '../../../../components/Link'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { selectTopicsList } from '../../../../store/forum/selectors'
import { useEffect } from 'react'
import { requestTopics } from '../../../../store/forum/thunk'

export function TopicsList() {
  const dispatch = useAppDispatch()
  const topicsList = useAppSelector(selectTopicsList)

  useEffect(() => {
    dispatch(requestTopics())
  }, [dispatch])

  return (
    <ul className="topics-list">
      {topicsList.map(data => (
        <li className="topics-list__item" key={data.id}>
          <Link text={data.title} href={`forum/${data.id}`} view="ghost" />
        </li>
      ))}
    </ul>
  )
}

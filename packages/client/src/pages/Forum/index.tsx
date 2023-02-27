import { TopicsList } from './parts/TopicsList'
import { ForumHeader } from './parts/ForumHeader'

export function Forum() {
  return (
    <div className="topics-wrapper">
      <ForumHeader />
      <TopicsList />
    </div>
  )
}

import { AddTopic } from '../AddTopic'
import { SearchTopic } from '../SearchTopic'
import './index.css'

export function ForumHeader() {
  return (
    <div className="forum-header">
      <AddTopic />
      <SearchTopic />
    </div>
  )
}

import type { BaseRESTService } from './baseService'
import { Comment } from '../models/comments'

interface FindRequest {
  message?: string
  topicId: number
}

interface CreateRequest {
  message: string
  topic_id: number
  authorId: number
}

class CommentsService implements BaseRESTService {
  public requestAll = ({ topicId, message }: FindRequest) => {
    return Comment.findAll({
      where: {
        topic_id: topicId,
        status: true,
        ...(message && { message: `%${message}%` }),
      },
    })
  }

  public request = ({ id }: { id: number }) => {
    return Comment.findByPk(id)
  }

  public create = (data: CreateRequest) => {
    return Comment.create(data)
  }

  public delete = (id: number) => {
    return Comment.update(
      {
        status: false,
      },
      {
        where: {
          id,
        },
      }
    )
  }
}

export default new CommentsService()

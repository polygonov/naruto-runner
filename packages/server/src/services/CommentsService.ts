import type { BaseRESTService } from './baseService'
import { Comment } from '../models/comments'

interface FindRequest {
  message?: string
  topicId: number
}

interface CreateRequest {
  message: string
  topicId: number
  authorId: number
}

class CommentsService implements BaseRESTService {
  public requestMany = ({ topicId, message }: FindRequest) => {
    if (message) {
      return Comment.findAll({
        where: {
          topicId,
          message: `%${message}%`,
          status: true,
        },
      })
    }

    return Comment.findAll({
      where: {
        topicId,
        status: true,
      },
    })
  }

  public create = (data: CreateRequest) => {
    return Comment.create(data)
  }

  public delete = (id: number, topicId: number) => {
    return Comment.update(
      {
        status: false,
      },
      {
        where: {
          topicId,
          id,
        },
      }
    )
  }
}

export default new CommentsService()

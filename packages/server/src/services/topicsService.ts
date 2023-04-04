import type { BaseRESTService } from './baseService'
import { Topic } from '../models/topics'
import { Comment } from '../models/comments'
interface FindRequest {
  title?: string
}

interface getOneRequest {
  id: number
}

interface CreateRequest {
  title: string
  authorId: number
}

class TopicsService implements BaseRESTService {
  public requestMany = ({ title }: FindRequest) => {
    if (title) {
      return Topic.findAll({
        where: {
          title: `%${title}%`,
          status: true,
        },
      })
    }

    return Topic.findAll({
      where: {
        status: true,
      },
    })
  }

  public requestOne = ({ id }: getOneRequest) => {
    return Topic.findByPk(id, {
      include: [
        {
          model: Comment,
          as: 'comments',
          where: {
            status: true,
          },
        },
      ],
    })
  }

  public find = ({ title }: FindRequest) => {
    return Topic.findAll({
      where: {
        title: `%${title}%`,
      },
    })
  }

  public create = (data: CreateRequest) => {
    return Topic.create(data)
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

export default new TopicsService()

import type { BaseRESTService } from './baseService'
import { Topic } from '../models/topics'
import { Comment } from '../models/comments'
import { User } from '../models/users'
interface FindRequest {
  title?: string
}

interface CreateRequest {
  title: string
  author_id: number
}

class TopicsService implements BaseRESTService {
  public requestAll = ({ title }: FindRequest) => {
    return Topic.findAll({
      where: {
        status: true,
        ...(title && { title: `%${title}%` }),
      },
      attributes: ['id', 'title', 'createdAt'],
    })
  }

  public request = (id: number) => {
    return Topic.findByPk(id, {
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'message', 'createdAt'],
          where: {
            status: true,
          },
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'login', 'avatar'],
            },
          ],
        },
        {
          model: User,
          as: 'author',
          attributes: ['id', 'login', 'avatar'],
        },
      ],
      attributes: ['id', 'title', 'createdAt'],
    })
  }

  public create = (data: CreateRequest) => {
    return Topic.create(data, {
      attributes: ['id', 'title', 'createdAt'],
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'message', 'createdAt'],
          where: {
            status: true,
          },
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'login', 'avatar'],
            },
          ],
        },
        {
          model: User,
          as: 'author',
          attributes: ['id', 'login', 'avatar'],
        },
      ],
    })
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

import type { Request, Response } from 'express'
import CommentsService from '../services/CommentsService'

export class CommentsController {
  public static getCommentsByTopic = async (req: Request, res: Response) => {
    const topicId = req.params.topicId
    const { message } = req.query

    if (!topicId) {
      res.status(400).json({ message: 'Bad request' })
    }

    const comments = await CommentsService.requestMany({
      topicId: Number(topicId),
      message: message ? String(message) : undefined,
    })
    res.json(comments)
  }

  public static createComment = async (req: Request, res: Response) => {
    const { message, authorId, topicId } = req.body

    if (!message || !authorId || !topicId) {
      res.status(400).json({ message: 'Bad request' })
    }

    const topic = await CommentsService.create({ message, authorId, topicId })
    res.json(topic)
  }

  public static deleteComment = async (req: Request, res: Response) => {
    const { topicId, commentId } = req.params

    if (!topicId || !commentId) {
      res.status(400).json({ message: 'Bad request' })
    }

    const topic = await CommentsService.delete(
      Number(commentId),
      Number(topicId)
    )
    res.json(topic)
  }
}

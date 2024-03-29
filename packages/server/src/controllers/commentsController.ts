import type { Request, Response } from 'express'
import CommentsService from '../services/commentsService'
import TopicsService from '../services/topicsService'

export class CommentsController {
  public static getCommentsByTopic = (req: Request, res: Response) => {
    const { topicId } = req.params
    const { message } = req.query

    if (!topicId) {
      res
        .status(400)
        .json({ message: 'Missing required field `topicId`', req: req.params })
      return
    }

    CommentsService.requestAll({
      topicId: Number(topicId),
      ...(message && { message: message as string }),
    })
      .then(comments => {
        if (!comments) {
          res.status(404).json({ message: 'No comments found' })
          return
        }
        res.json(comments)
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }

  public static createComment = (req: Request, res: Response) => {
    const { topicId } = req.params
    const { message, authorId } = req.body

    if (!message || !authorId || !topicId) {
      res.status(400).json({
        message:
          'Missing some of required fields `topic_id | authorId | message`',
      })
      return
    }

    CommentsService.create({
      message,
      author_id: authorId,
      topic_id: Number(topicId),
    })
      .then(comment => {
        if (!comment) {
          res.status(404).json({ message: 'No comment found' })
          return
        }
        TopicsService.request(Number(topicId))
          .then(topic => {
            if (!topic) {
              res.status(500).json({ message: 'Something went wrong' })
              return
            }
            res.json(topic)
          })
          .catch(err => {
            res.status(500).json({ message: err.message })
          })
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }

  public static deleteComment = (req: Request, res: Response) => {
    const { commentId } = req.params

    if (!commentId) {
      res.status(400).json({ message: 'Missing required field `commentId`' })
      return
    }

    CommentsService.delete(Number(commentId))
      .then(([updatedComments]) => {
        if (!updatedComments) {
          res.status(404).json({ message: 'No comment found' })
          return
        }
        res.status(204).json({ message: 'Comment deleted' })
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }
}

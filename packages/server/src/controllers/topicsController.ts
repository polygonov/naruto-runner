import type { Request, Response } from 'express'
import TopicsService from '../services/topicsService'

export class TopicsController {
  public static getTopics = (req: Request, res: Response) => {
    const { title } = req.query

    TopicsService.requestAll({
      ...(title && { title: title as string }),
    })
      .then(topics => {
        if (!topics) {
          res.status(404).json({ message: 'Something went wrong' })
          return
        }
        res.json(topics)
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }
  public static getTopic = (req: Request, res: Response) => {
    const { topicId } = req.params

    if (!topicId) {
      res.status(400).json({ message: 'Missing required field `topicId`' })
      return
    }

    TopicsService.request(Number(topicId))
      .then(topic => {
        console.log(topic)
        if (!topic) {
          res.status(404).json({ message: 'Topic with given id not found' })
          return
        }

        res.json(topic)
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }

  public static createTopic = (req: Request, res: Response) => {
    const { title, authorId } = req.body

    if (!title || !authorId) {
      res
        .status(400)
        .json({ message: 'Missing some of required fields `title | authorId`' })
      return
    }

    TopicsService.create({ title, author_id: authorId })
      .then(topic => {
        if (!topic) {
          res.status(404).json({ message: 'No topic found' })
          return
        }
        res.json(topic)
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }

  public static deleteTopic = (req: Request, res: Response) => {
    const { topicId } = req.params

    if (!topicId) {
      res.status(400).json({ message: 'Missing required field `topicId`' })
      return
    }

    TopicsService.delete(Number(topicId))
      .then(([updatedTopics]) => {
        if (!updatedTopics) {
          res.status(404).json({ message: 'No topic found' })
          return
        }
        res.status(204).json({ message: 'Topic deleted' })
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }
}

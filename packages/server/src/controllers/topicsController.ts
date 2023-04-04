import type { Request, Response } from 'express'
import TopicsService from '../services/topicsService'
import type { Topic } from '../models/topics'

export class TopicsController {
  public static getTopics = async (req: Request, res: Response) => {
    const { title } = req.query
    let topics: Topic[]

    if (title) {
      topics = await TopicsService.requestMany({ title: String(title) })
    } else {
      topics = await TopicsService.requestMany({})
    }

    res.json(topics)
  }
  public static getTopic = async (req: Request, res: Response) => {
    const id = req.params.topicId

    if (!id) {
      res.status(400).json({ message: 'Bad request' })
    }

    const topic = await TopicsService.requestOne({ id: Number(id) })
    if (!topic) {
      res.status(404).json({ message: 'Topic not found' })
    }

    res.json(topic)
  }

  public static createTopic = async (req: Request, res: Response) => {
    const { title, authorId } = req.body

    if (!title || !authorId) {
      res.status(400).json({ message: 'Bad request' })
    }

    const topic = await TopicsService.create({ title, authorId })
    res.json(topic)
  }

  public static deleteTopic = async (req: Request, res: Response) => {
    const id = req.params.topicId

    if (!id) {
      res.status(400).json({ message: 'Bad request' })
    }

    const topic = await TopicsService.delete(Number(id))
    res.json(topic)
  }
}

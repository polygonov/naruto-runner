export type Comment = {
  id: number
  message: string
  author: Author
  createdAt: string
}

export type Author = {
  id: number
  login: string
  avatar: string
}

export type Topic = {
  id: number
  title: string
  createdAt: string
  author: Author
  comments: Comment[]
}

export type TopicsList = Omit<Topic, 'author' | 'comments'>[]

export type RequestTopicsPayload = {
  title?: string
}

export type CreateTopicPayload = {
  title: string
  authorId: number
}

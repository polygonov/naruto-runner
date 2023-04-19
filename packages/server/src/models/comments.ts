import {
  DataType,
  Column,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  ForeignKey,
  Index,
} from 'sequelize-typescript'
import { Topic } from './topics'
import type { Optional } from 'sequelize'
import { User } from './users'

type CommentAttributes = {
  id: number
  message: string
  topic_id: number
  authorId: number
  status: boolean
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id' | 'status'>

@Table({
  tableName: 'comments_table',
  timestamps: true,
  updatedAt: false,
})
export class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  message: string

  @Index
  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  topic_id: number

  @Index
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  author_id: number

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean
}

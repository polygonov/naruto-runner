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
  BelongsTo,
} from 'sequelize-typescript'
import { Topic } from './topics'
import type { Optional } from 'sequelize'
import { User } from './users'

type CommentAttributes = {
  id: number
  message: string
  topic_id: number
  author_id: number
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

  @BelongsTo(() => Topic, {
    foreignKey: {
      name: 'topic_id',
      allowNull: false,
    },
    as: 'topic',
  })
  topic: Topic

  @Index
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  author_id: number

  @BelongsTo(() => User, {
    foreignKey: {
      name: 'author_id',
      allowNull: false,
    },
    as: 'author',
  })
  author: User

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean
}

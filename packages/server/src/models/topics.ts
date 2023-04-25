import {
  DataType,
  Column,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  Index,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript'
import type { Optional } from 'sequelize'
import { User } from './users'
import { Comment } from './comments'

type TopicAttributes = {
  id: number
  title: string
  author_id: number
  status: boolean
}

type TopicCreationAttributes = Optional<TopicAttributes, 'id' | 'status'>

@Table({
  tableName: 'topics_table',
  timestamps: true,
  updatedAt: false,
})
export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string

  @HasMany(() => Comment, {
    foreignKey: {
      name: 'topic_id',
      allowNull: false,
    },
    as: 'comments',
  })
  comments: Comment[]

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

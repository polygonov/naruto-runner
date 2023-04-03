import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'topics_table',
  timestamps: true,
  updatedAt: false,
})
export default class Topic extends Model<Topic> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string | undefined
}

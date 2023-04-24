import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import type { Optional } from 'sequelize'

export type UserAttributes = {
  id: number
  yandex_id: number
  login: string
  avatar: string
  isDarkMode: boolean
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'avatar' | 'isDarkMode'
>

@Table({
  tableName: 'users_table',
  timestamps: false,
  updatedAt: false,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id: number

  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  yandex_id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  login: string

  @Column(DataType.STRING)
  avatar: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isDarkMode: boolean
}

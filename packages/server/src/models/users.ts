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

type UserAttributes = {
  id: number
  yandex_id: number
  login: string
  display_name: string
  avatar: string
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'avatar' | 'display_name'
>

@Table({
  tableName: 'users_table',
  timestamps: false,
  updatedAt: false,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  yandex_id: number

  @AllowNull(false)
  @Column
  login: string

  @Column
  display_name: string

  @Column
  avatar: string
}

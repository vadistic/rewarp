import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base/base.entity'

@Entity()
export class UserEntity extends BaseEntity {
  @Column('text')
  password!: string

  @Column('text', { unique: true })
  email!: string

  @Column('text', { nullable: true })
  name?: string

  @Column('text', { nullable: true })
  avatarUrl?: string
}

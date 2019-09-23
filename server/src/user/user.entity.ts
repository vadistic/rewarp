import { Column, Entity } from 'typeorm'
import { Base } from '../common/base/base.entity'

@Entity()
export class User extends Base {
  @Column('text', { nullable: true })
  name?: string

  @Column('text', { unique: true })
  email!: string
}

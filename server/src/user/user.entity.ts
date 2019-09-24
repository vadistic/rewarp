import { Column, Entity } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { Base } from '../common/base/base.entity'

@Entity()
@ObjectType()
export class User extends Base {
  @Column('text')
  password!: string

  @Field()
  @Column('text', { unique: true })
  email!: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  name?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  avatarUrl?: string
}

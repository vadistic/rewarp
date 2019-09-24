import { ObjectType, Field } from 'type-graphql'
import { Base } from '../base/base.model'

@ObjectType()
export class User extends Base {
  @Field()
  password!: string

  @Field()
  email!: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  avatarUrl?: string
}

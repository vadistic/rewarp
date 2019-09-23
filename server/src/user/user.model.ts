import { ObjectType, Field } from 'type-graphql'
import { Base } from '../common/base/base.model'

@ObjectType()
export class User extends Base {
  @Field({ nullable: true })
  name?: string

  @Field()
  email!: string
}

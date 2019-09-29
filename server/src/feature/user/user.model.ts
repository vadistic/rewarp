import { ObjectType, Field } from 'type-graphql'
import { BaseModel } from '../../common/base/base.model'

@ObjectType()
export class UserModel extends BaseModel {
  @Field()
  password!: string

  @Field()
  email!: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  avatarUrl?: string
}

import { Field, ObjectType } from 'type-graphql'
import { BaseModel } from '../../graphql/base/base.model'

@ObjectType({ isAbstract: true })
class UserBaseModel extends BaseModel {
  @Field()
  email!: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  avatarUrl?: string
}

@ObjectType()
export class UserPublicModel extends UserBaseModel {}

@ObjectType()
export class UserCurrentModel extends UserBaseModel {}

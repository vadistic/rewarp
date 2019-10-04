import { Field, ObjectType } from 'type-graphql'
import { BaseModel } from '../../common/base/base.model'
import { UserPublicModel } from '../user/user.model'

@ObjectType('Workspace')
export class WorkspaceModel extends BaseModel {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string

  //

  @Field(type => [UserPublicModel])
  users!: UserPublicModel[]
}

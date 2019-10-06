import { Field, ObjectType } from 'type-graphql'
import { BaseModel } from '../../graphql/base/base.model'
import { ClientModel } from '../client/client.model'
import { EntryModel } from '../entry/entry.model'
import { UserPublicModel } from '../user/user.model'

@ObjectType('Project')
export class ProjectModel extends BaseModel {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string

  //

  @Field(type => ClientModel, { nullable: true })
  client?: ClientModel

  @Field(type => [EntryModel], { nullable: true })
  entries!: EntryModel[]

  @Field(type => [UserPublicModel])
  users!: UserPublicModel[]
}

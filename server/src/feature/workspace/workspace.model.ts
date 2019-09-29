import { Field, ObjectType } from 'type-graphql'
import { BaseModel } from '../../common/base/base.model'

@ObjectType()
export class Workspace extends BaseModel {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

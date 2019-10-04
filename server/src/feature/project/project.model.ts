import { Field, ObjectType } from 'type-graphql'
import { BaseModel } from '../../graphql/base/base.model'

@ObjectType()
export class Project extends BaseModel {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

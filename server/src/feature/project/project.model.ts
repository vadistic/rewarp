import { Base } from '../base/base.model'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Project extends Base {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

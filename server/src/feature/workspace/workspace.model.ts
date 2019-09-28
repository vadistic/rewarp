import { Field, ObjectType } from 'type-graphql'

import { Base } from '../base/base.model'

@ObjectType()
export class Workspace extends Base {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

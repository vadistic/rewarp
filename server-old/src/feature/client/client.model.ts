import { Field, ObjectType } from 'type-graphql'
import { BaseModel } from '../../graphql/base/base.model'

@ObjectType('Client')
export class ClientModel extends BaseModel {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

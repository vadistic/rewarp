import { ObjectType, Field } from 'type-graphql'
import { ID } from './base.types'

@ObjectType({ isAbstract: true })
export abstract class Base {
  @Field()
  id!: ID

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

import { ObjectType, Field, ID } from 'type-graphql'
import { IDType } from '../../types'

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(type => ID)
  id!: IDType

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

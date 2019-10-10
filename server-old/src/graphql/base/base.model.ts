import { Field, ID, ObjectType } from 'type-graphql'
import { IDType } from '../../database/entity.interface'

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(type => ID)
  id!: IDType

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

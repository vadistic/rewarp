import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(type => ID)
  id!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

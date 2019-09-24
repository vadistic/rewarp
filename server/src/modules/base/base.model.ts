import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ isAbstract: true })
export abstract class Base {
  @Field(type => ID)
  id!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

import { InterfaceType, Field, ID, ObjectType } from 'type-graphql'

@InterfaceType()
export abstract class DeleteResponse {
  @Field(() => ID)
  id!: string
}

@ObjectType()
export class StandardDeleteResponse {
  @Field(() => ID)
  id!: string
}

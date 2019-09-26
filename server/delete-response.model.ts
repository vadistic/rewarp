import { Field, ID, InterfaceType, ObjectType } from 'type-graphql'

import { IDType } from '../nestjs-warthog/src/types'

@InterfaceType()
export abstract class BaseDeleteResponse {
  @Field(() => ID)
  id!: IDType
}

@ObjectType()
export class DeleteResponse {
  @Field(() => ID)
  id!: IDType
}

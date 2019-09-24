import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AuthPayload {
  @Field()
  access_token!: string
}

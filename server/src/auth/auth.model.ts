import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AuthPayload {
  @Field()
  token_type!: string

  @Field()
  access_token!: string

  @Field({ nullable: true })
  refresh_token?: string
}

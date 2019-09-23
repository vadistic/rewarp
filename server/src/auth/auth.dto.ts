import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class AuthArgs {
  @Field()
  email!: string

  @Field()
  password!: string
}

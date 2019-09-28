import { InputType, Field } from 'type-graphql'

@InputType()
export class UserWhereUniqueInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string
}

@InputType()
export class UserCreateInput {
  @Field()
  email!: string

  @Field()
  password!: string

  @Field({ nullable: true })
  name?: string
}

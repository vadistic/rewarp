import { Field, InputType } from 'type-graphql'
import { IdSearchInput, StringSearchInput } from '../../graphql/base/dto/search.input'

@InputType()
export class UserWhereUniqueInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string
}

@InputType()
export class UserWhereInput {
  @Field(type => IdSearchInput, { nullable: true })
  id?: IdSearchInput

  @Field(type => StringSearchInput, { nullable: true })
  email?: StringSearchInput
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

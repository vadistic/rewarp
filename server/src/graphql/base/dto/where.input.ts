import { Field, ID, ArgsType, InputType } from 'type-graphql'
import { IdSearchInput, DateSearchInput } from './search.input'

@InputType()
export class WhereUniqueInput {
  @Field(type => ID)
  id!: string
}

@ArgsType()
export class WhereUniqueInputArgs {
  @Field()
  where!: WhereUniqueInput
}

@InputType({ isAbstract: true })
export abstract class BaseWhereInput {
  @Field(type => IdSearchInput, { nullable: true })
  id?: IdSearchInput

  @Field(type => DateSearchInput, { nullable: true })
  createdAt?: DateSearchInput

  @Field(type => DateSearchInput, { nullable: true })
  updatedAt?: DateSearchInput
}

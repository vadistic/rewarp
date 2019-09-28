import { Field, ID, ArgsType, InputType } from 'type-graphql'

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

@InputType()
export class BaseWhereInput {
  @Field(() => String, { nullable: true })
  id_eq?: string

  @Field(() => [String], { nullable: true })
  id_in?: string[]

  //

  @Field({ nullable: true })
  createdAt_eq?: string

  @Field({ nullable: true })
  createdAt_lte?: string

  @Field({ nullable: true })
  createdAt_gte?: string

  //

  @Field({ nullable: true })
  updatedAt_eq?: string

  @Field({ nullable: true })
  updatedAt_lte?: string

  @Field({ nullable: true })
  updatedAt_gte?: string
}

import { Field, InputType } from 'type-graphql'

@InputType({ isAbstract: true })
export abstract class BaseWhereInput {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  id_eq?: string
  @Field(() => [String], { nullable: true })
  id_in?: string[]

  @Field({ nullable: true })
  createdAt_eq?: string
  @Field({ nullable: true })
  createdAt_lt?: string
  @Field({ nullable: true })
  createdAt_lte?: string
  @Field({ nullable: true })
  createdAt_gt?: string
  @Field({ nullable: true })
  createdAt_gte?: string

  @Field({ nullable: true })
  updatedAt_eq?: string
  @Field({ nullable: true })
  updatedAt_lt?: string
  @Field({ nullable: true })
  updatedAt_lte?: string
  @Field({ nullable: true })
  updatedAt_gt?: string
  @Field({ nullable: true })
  updatedAt_gte?: string
}

@InputType()
export class BaseWhereUniqueInput {
  @Field(() => String)
  id!: string
}

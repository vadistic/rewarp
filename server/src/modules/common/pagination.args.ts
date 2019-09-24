import { Field, ArgsType, Int } from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field(type => Int, { nullable: true })
  skip?: number

  @Field(type => Int, { nullable: true })
  take?: number
}

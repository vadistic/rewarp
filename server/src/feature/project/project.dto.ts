import { Field, InputType } from 'type-graphql'
import { IdSearchInput, StringSearchInput } from '../../graphql/base/dto/search.input'

@InputType()
export class ProjectWhereUniqueInput {
  @Field()
  id!: string
}

@InputType()
export class ProjectWhereInput {
  @Field(type => IdSearchInput, { nullable: true })
  id?: IdSearchInput

  @Field(type => StringSearchInput, { nullable: true })
  name?: StringSearchInput

  @Field(type => StringSearchInput, { nullable: true })
  description?: StringSearchInput
}

@InputType()
export class ProjectCreateInput {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

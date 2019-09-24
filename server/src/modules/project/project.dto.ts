import { Field, InputType } from 'type-graphql'

@InputType()
export class ProjectWhereUniqueInput {
  @Field()
  id!: string
}

@InputType()
export class ProjectCreateInput {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

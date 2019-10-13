import { Field, InputType } from 'type-graphql'

@InputType()
export class WorkspaceWhereUniqueInput {
  @Field()
  id!: string
}

@InputType()
export class WorkspaceCreateInput {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

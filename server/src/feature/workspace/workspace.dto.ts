import { InputType, Field } from 'type-graphql'

@InputType()
export class WorkspaceWhereUniqueInput {
  @Field({ nullable: true })
  id?: string
}

@InputType()
export class WorkspaceCreateInput {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

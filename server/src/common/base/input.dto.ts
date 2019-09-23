import { InputType, ArgsType, Field } from 'type-graphql'
import { WhereUniqueInputArgs } from './where.input'

//  generate this!

@InputType()
export class TemplateWhereInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt!: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string
}

@InputType()
export class TemplateCreateInput {
  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string
}

@InputType()
export class TemplateUpdateInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string
}

// CRUD

@ArgsType()
export class TemplateCreateInputArgs {
  @Field()
  data!: TemplateCreateInput
}

@ArgsType()
export class TemplateReadInputArgs {
  @Field()
  where!: WhereUniqueInputArgs
}

@ArgsType()
export class TemplateUpdateInputArgs {
  @Field()
  where!: WhereUniqueInputArgs

  @Field()
  data!: TemplateUpdateInput
}

@ArgsType()
export class TemplateDeleteInputArgs {
  @Field()
  where!: WhereUniqueInputArgs
}

// BATCH CRUD

@ArgsType()
export class TemplateCreateManyInputArgs {
  @Field()
  data!: [TemplateCreateInput]
}

@ArgsType()
export class TemplateReadManyInputArgs {
  @Field()
  where!: [WhereUniqueInputArgs]
}

@ArgsType()
export class TemplateUpdateManyInputArgs {
  @Field()
  where!: [WhereUniqueInputArgs]

  @Field()
  data!: TemplateUpdateInput
}

@ArgsType()
export class TemplateDeleteManyInputArgs {
  @Field()
  where!: [WhereUniqueInputArgs]
}

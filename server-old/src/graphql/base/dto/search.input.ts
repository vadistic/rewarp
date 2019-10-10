import { InputType, Field, Int, ID, Float } from 'type-graphql'

export type SearchInput =
  | IdSearchInput
  | BooleanSearchInput
  | StringSearchInput
  | FloatSearchInput
  | IntSearchInput
  | DateSearchInput

// SEARCH

@InputType()
export class IdSearchInput {
  @Field(type => ID, { nullable: true })
  eq?: string;

  @Field(type => ID, { nullable: true })
  in?: string[]

  @Field(type => ID, { nullable: true })
  not?: string
}

@InputType()
export class BooleanSearchInput {
  @Field(type => Boolean, { nullable: true })
  eq?: boolean;

  @Field(type => [Boolean], { nullable: true })
  in?: boolean[]

  @Field(type => Boolean, { nullable: true })
  not?: boolean
}

@InputType()
export class StringSearchInput {
  @Field(type => String, { nullable: true })
  eq?: string;

  @Field(type => [String], { nullable: true })
  in?: string[]

  @Field(type => String, { nullable: true })
  not?: string

  @Field({ nullable: true })
  contains?: string

  @Field({ nullable: true })
  startsWith?: string

  @Field({ nullable: true })
  endsWith?: string
}

@InputType()
export class FloatSearchInput {
  @Field(type => Float, { nullable: true })
  eq?: number;

  @Field(type => [Float], { nullable: true })
  in?: number[]

  @Field(type => Float, { nullable: true })
  not?: number

  @Field(type => Float, { nullable: true })
  lt?: number

  @Field(type => Float, { nullable: true })
  lte?: number

  @Field(type => Float, { nullable: true })
  gt?: number

  @Field(type => Float, { nullable: true })
  gte?: number
}

@InputType()
export class IntSearchInput {
  @Field(type => Int, { nullable: true })
  eq?: number;

  @Field(type => [Int], { nullable: true })
  in?: number[]

  @Field({ nullable: true })
  not?: number

  @Field(type => Int, { nullable: true })
  lt?: number

  @Field(type => Int, { nullable: true })
  lte?: number

  @Field(type => Int, { nullable: true })
  gt?: number

  @Field(type => Int, { nullable: true })
  gte?: number
}

@InputType()
export class DateSearchInput {
  @Field(type => Date, { nullable: true })
  eq?: Date;

  @Field(type => [Date], { nullable: true })
  in?: Date[]

  @Field(type => Date, { nullable: true })
  not?: Date

  @Field(type => Date, { nullable: true })
  lt?: Date

  @Field(type => Date, { nullable: true })
  lte?: Date

  @Field(type => Date, { nullable: true })
  gt?: Date

  @Field(type => Date, { nullable: true })
  gte?: Date
}

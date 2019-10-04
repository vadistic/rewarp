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
  @Field({ nullable: true })
  eq?: boolean;

  @Field(type => [Boolean], { nullable: true })
  in?: boolean[]

  @Field(type => Boolean, { nullable: true })
  not?: boolean
}

@InputType()
export class StringSearchInput {
  @Field({ nullable: true })
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
  @Field({ nullable: true })
  eq?: number;

  @Field(type => [Float], { nullable: true })
  in?: number[]

  @Field({ nullable: true })
  not?: number

  @Field({ nullable: true })
  lt?: number

  @Field({ nullable: true })
  lte?: number

  @Field({ nullable: true })
  gt?: number

  @Field({ nullable: true })
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
  @Field({ nullable: true })
  eq?: Date;

  @Field(type => [Date], { nullable: true })
  in?: Date[]

  @Field(type => Date, { nullable: true })
  not?: Date

  @Field({ nullable: true })
  lt?: Date

  @Field({ nullable: true })
  lte?: Date

  @Field({ nullable: true })
  gt?: Date

  @Field({ nullable: true })
  gte?: Date
}

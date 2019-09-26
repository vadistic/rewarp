import { Field, ObjectType } from 'type-graphql'
import { PrimaryGeneratedColumn } from 'typeorm'

@ObjectType({ isAbstract: true })
export abstract class BaseStringIdModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  deletedAt?: Date
}

@ObjectType({ isAbstract: true })
export abstract class BaseIntIdModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  createdAt!: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  deletedAt?: Date
}

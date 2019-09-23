import { Column, Entity } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Base } from '../common/base/base.entity'

@Entity()
@ObjectType()
export class Workspace extends Base {
  @Field()
  @Column('text')
  name!: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string
}

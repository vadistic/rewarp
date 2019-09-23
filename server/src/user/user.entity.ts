import { Column, Entity, BeforeInsert } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { createHmac } from 'crypto'
import { Base } from '../common/base/base.entity'

@Entity()
@ObjectType()
export class User extends Base {
  // Move to user signup service?
  @BeforeInsert()
  hashPassword(): void {
    this.password = createHmac('sha256', this.password).digest('hex')
  }

  @Column('text')
  password!: string

  @Field()
  @Column('text', { unique: true })
  email!: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  name?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  avatarUrl?: string
}

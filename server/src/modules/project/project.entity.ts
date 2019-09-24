import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base/base.entity'

@Entity()
export class ProjectEntity extends BaseEntity {
  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  description?: string
}

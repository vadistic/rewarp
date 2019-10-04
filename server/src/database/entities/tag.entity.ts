import { Column, Entity, OneToMany } from 'typeorm'
import { Lazy } from '../../types'
import { BaseTenantEntity } from './base.entity'
import { TagEntryXrefEntity } from './tag-entry.xref.entity'

@Entity()
export class TagEntity extends BaseTenantEntity {
  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  //

  @OneToMany(type => TagEntryXrefEntity, xref => xref.tag)
  entriesXref!: Lazy<TagEntryXrefEntity[]>
}

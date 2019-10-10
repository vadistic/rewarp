import { Column, Entity, OneToMany } from 'typeorm'
import { Nullable } from '../database.interfaces'
import { BaseTenantEntity } from './base.entity'
import { TagEntryXrefEntity } from './tag-entry.xref.entity'

@Entity()
export class TagEntity extends BaseTenantEntity {
  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>

  //

  @OneToMany(type => TagEntryXrefEntity, xref => xref.tag)
  entriesXref!: TagEntryXrefEntity[]
}

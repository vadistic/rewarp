import { BaseTenantEntity } from './base.entity'
import { Column, OneToMany, ManyToOne, Entity } from 'typeorm'
import { ClientEntity } from './client.entity'
import { UserEntity } from './user.entity'
import { ProjectEntity } from './project.entity'
import { TagEntryXrefEntity } from './tag-entry.xref.entity'

@Entity()
export class EntryEntity extends BaseTenantEntity {
  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @Column('timestamptz')
  start!: Date

  @Column('timestamptz', { nullable: true })
  end?: Date

  @ManyToOne(type => ClientEntity, client => client.entries, { nullable: true })
  client?: ClientEntity

  @ManyToOne(type => UserEntity, user => user.entries, { nullable: true })
  user?: UserEntity

  @ManyToOne(type => ProjectEntity, project => project.entries, { nullable: true })
  project?: ProjectEntity

  @OneToMany(type => TagEntryXrefEntity, xref => xref.entry)
  tagsXRef!: TagEntryXrefEntity[]
}

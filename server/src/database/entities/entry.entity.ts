import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Lazy } from '../../types'
import { BaseTenantEntity } from './base.entity'
import { ClientEntity } from './client.entity'
import { ProjectEntity } from './project.entity'
import { TagEntryXrefEntity } from './tag-entry.xref.entity'
import { UserEntity } from './user.entity'

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

  //

  @ManyToOne(type => ClientEntity, client => client.entries, { nullable: true })
  client?: Lazy<ClientEntity>

  @ManyToOne(type => UserEntity, user => user.entries, { nullable: true })
  user?: Lazy<UserEntity>

  @ManyToOne(type => ProjectEntity, project => project.entries, { nullable: true })
  project?: Lazy<ProjectEntity>

  @OneToMany(type => TagEntryXrefEntity, xref => xref.entry)
  tagsXRef!: Lazy<TagEntryXrefEntity[]>
}

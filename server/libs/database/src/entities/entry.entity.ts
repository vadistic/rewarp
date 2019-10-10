import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Nullable } from '../database.interfaces'
import { BaseTenantEntity } from './base.entity'
import { ClientEntity } from './client.entity'
import { ProjectEntity } from './project.entity'
import { TagEntryXrefEntity } from './tag-entry.xref.entity'
import { UserEntity } from './user.entity'

@Entity()
export class EntryEntity extends BaseTenantEntity {
  @Column({ type: 'text', nullable: true })
  name!: Nullable<string>

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>

  @Column({ type: 'date' })
  start!: Date

  @Column({ type: 'date' })
  end!: Nullable<Date>

  //

  //
  @ManyToOne(type => ClientEntity, client => client.entries, { nullable: true })
  client!: Nullable<ClientEntity>

  @ManyToOne(type => UserEntity, user => user.entries, { nullable: true })
  user!: Nullable<UserEntity>

  @ManyToOne(type => ProjectEntity, project => project.entries, { nullable: true })
  project!: Nullable<ProjectEntity>

  @OneToMany(type => TagEntryXrefEntity, xref => xref.entry)
  tagsXRef!: TagEntryXrefEntity[]
}

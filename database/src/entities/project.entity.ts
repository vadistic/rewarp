import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Nullable } from '../types'
import { BaseTenantEntity } from './base.entity'
import { ClientEntity } from './client.entity'
import { EntryEntity } from './entry.entity'
import { ProjectUserXrefEntity } from './project-user.xref.entity'

@Entity()
export class ProjectEntity extends BaseTenantEntity {
  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>

  //

  @ManyToOne(type => ClientEntity, client => client.projects)
  client!: Nullable<ClientEntity>

  @OneToMany(type => EntryEntity, entry => entry.project)
  entries!: EntryEntity[]

  @OneToMany(type => ProjectUserXrefEntity, xref => xref.project)
  usersXref!: ProjectUserXrefEntity[]
}

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Lazy } from '../entity.interface'
import { BaseTenantEntity } from './base.entity'
import { ClientEntity } from './client.entity'
import { EntryEntity } from './entry.entity'
import { ProjectUserXrefEntity } from './project-user.xref.entity'

@Entity()
export class ProjectEntity extends BaseTenantEntity {
  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  //

  @ManyToOne(type => ClientEntity, client => client.projects)
  client?: Lazy<ClientEntity>

  @OneToMany(type => EntryEntity, entry => entry.project)
  entries!: Lazy<EntryEntity[]>

  @OneToMany(type => ProjectUserXrefEntity, xref => xref.project)
  usersXref!: Lazy<ProjectUserXrefEntity[]>
}

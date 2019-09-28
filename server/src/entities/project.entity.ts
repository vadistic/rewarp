import { BaseTenantEntity } from './base.entity'
import { Column, ManyToOne, OneToMany, Entity } from 'typeorm'
import { ClientEntity } from './client.entity'
import { EntryEntity } from './entry.entity'
import { ProjectUserXrefEntity } from './project-user.xref.entity'

@Entity()
export class ProjectEntity extends BaseTenantEntity {
  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  @ManyToOne(type => ClientEntity, client => client.projects)
  client?: ClientEntity

  @OneToMany(type => EntryEntity, entry => entry.project)
  entries!: EntryEntity[]

  @OneToMany(type => ProjectUserXrefEntity, xref => xref.project)
  usersXref!: ProjectUserXrefEntity[]
}

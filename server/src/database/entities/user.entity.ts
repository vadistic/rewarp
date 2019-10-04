import { Column, Entity, OneToMany } from 'typeorm'
import { Lazy } from '../../types'
import { BaseGlobalEntity } from './base.entity'
import { EntryEntity } from './entry.entity'
import { ProjectUserXrefEntity } from './project-user.xref.entity'
import { WorkspaceUserXrefEntity } from './workspace-user.xref.entity'

@Entity()
export class UserEntity extends BaseGlobalEntity {
  @Column('text', { nullable: true })
  name?: string

  @Column('text', { nullable: true })
  description?: string

  @Column('text', { unique: true })
  email!: string

  @Column('text')
  password!: string

  @Column('text')
  timezone!: string

  @Column('text')
  location!: string

  @Column('text', { nullable: true })
  avatarUrl?: string

  //

  @OneToMany(type => EntryEntity, entry => entry.user)
  entries!: Lazy<EntryEntity[]>

  @OneToMany(type => WorkspaceUserXrefEntity, xref => xref.user)
  workspacesXRef!: Lazy<WorkspaceUserXrefEntity[]>

  @OneToMany(type => ProjectUserXrefEntity, xref => xref.user)
  projectsXRef!: Lazy<ProjectUserXrefEntity[]>
}

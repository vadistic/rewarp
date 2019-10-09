import { Column, Entity, OneToMany } from 'typeorm'
import { Nullable } from '../types'
import { BaseGlobalEntity } from './base.entity'
import { EntryEntity } from './entry.entity'
import { ProjectUserXrefEntity } from './project-user.xref.entity'
import { WorkspaceUserXrefEntity } from './workspace-user.xref.entity'

@Entity()
export class UserEntity extends BaseGlobalEntity {
  @Column({ type: 'text', nullable: true })
  name!: Nullable<string>

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>

  @Column({ type: 'text', nullable: true })
  email!: string

  @Column({ type: 'text' })
  password!: string

  @Column({ type: 'text' })
  timezone!: string

  @Column({ type: 'text' })
  location!: string

  @Column({ type: 'text', nullable: true })
  avatarUrl!: Nullable<string>

  //

  @OneToMany(type => EntryEntity, entry => entry.user)
  entries!: EntryEntity[]

  @OneToMany(type => WorkspaceUserXrefEntity, xref => xref.user)
  workspacesXRef!: WorkspaceUserXrefEntity[]

  @OneToMany(type => ProjectUserXrefEntity, xref => xref.user)
  projectsXRef!: ProjectUserXrefEntity[]
}

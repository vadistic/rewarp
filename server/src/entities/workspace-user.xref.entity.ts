import { BaseTenantEntity } from './base.entity'
import { Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { UserEntity } from './user.entity'
import { WorkspaceEntity } from './workspace.entity'
import { WorkspaceRoleEntity } from './role.entity'

@Entity()
export class WorkspaceUserXrefEntity extends BaseTenantEntity {
  @ManyToOne(type => UserEntity, user => user.workspacesXRef)
  user!: UserEntity

  @ManyToOne(type => WorkspaceEntity, workspace => workspace.usersXref)
  workspace!: WorkspaceEntity

  @ManyToMany(type => WorkspaceRoleEntity, role => role.usersXref)
  @JoinTable()
  roles!: WorkspaceRoleEntity[]
}

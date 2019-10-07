import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { BaseTenantEntity } from './base.entity'
import { WorkspaceRoleEntity } from './role.entity'
import { UserEntity } from './user.entity'
import { WorkspaceEntity } from './workspace.entity'

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

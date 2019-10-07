import { Column, Entity, ManyToMany } from 'typeorm'
import { BaseTenantEntity } from './base.entity'
import { ProjectUserXrefEntity } from './project-user.xref.entity'
import { WorkspaceUserXrefEntity } from './workspace-user.xref.entity'

export enum WorkspacePermission {
  WORKSPACE_UPDATE = 'WORKSPACE_UPDATE',
  WORKSPACE_DELETE = 'WORKSPACE_DELETE',

  WORKSPACE_USER_ACCESS = 'WORKSPACE_USER_ACCESS',
  WORKSPACE_USER_CREATE = 'WORKSPACE_USER_CREATE',
  WORKSPACE_USER_UPDATE = 'WORKSPACE_USER_UPDATE',
  WORKSPACE_USER_DELETE = 'WORKSPACE_USER_DELETE',

  PROJECT_ACCESS = 'PROJECT_ACCESS',
  PROJECT_CREATE = 'PROJECT_CREATE',
  PROJECT_UPDATE = 'PROJECT_UPDATE',
  PROJECT_DELETE = 'PROJECT_DELETE',

  PROJECT_USER_ACCESS = 'PROJECT_USER_ACCESS',
  PROJECT_USER_CREATE = 'PROJECT_USER_CREATE',
  PROJECT_USER_UPDATE = 'PROJECT_USER_UPDATE',
  PROJECT_USER_DELETE = 'PROJECT_USER_DELETE',

  ENTRY_ACCESS_OWN = 'ENTRY_ACCESS_OWN',
  ENTRY_CREATE_OWN = 'ENTRY_CREATE_OWN',
  ENTRY_UPDATE_OWN = 'ENTRY_UPDATE_OWN',
  ENTRY_DELETE_OWN = 'ENTRY_DELETE_OWN',

  ENTRY_ACCESS_ALL = 'ENTRY_ACCESS_ALL',
  ENTRY_CREATE_ALL = 'ENTRY_CREATE_ALL',
  ENTRY_UPDATE_ALL = 'ENTRY_UPDATE_ALL',
  ENTRY_DELETE_ALL = 'ENTRY_DELETE_ALL',

  TAG_ACCESS = 'TAG_ACCESS',
  TAG_UPDATE = 'TAG_UPDATE',
  TAG_DELETE = 'TAG_DELETE',

  TAG_ENTRY_ACCESS = 'TAG_ENTRY_ACCESS',
  TAG_ENTRY_CREATE = 'TAG_ENTRY_CREATE',
  TAG_ENTRY_DELETE = 'TAG_ENTRY_DELETE',

  CLIENT_CREATE = 'CLIENT_CREATE',
  CLIENT_UPDATE = 'CLIENT_UPDATE',
  CLIENT_DELETE = 'CLIENT_DELETE',
}

@Entity()
export class WorkspaceRoleEntity extends BaseTenantEntity {
  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  @Column({ type: 'enum', enum: WorkspacePermission, array: true })
  permissions!: WorkspacePermission[]

  @Column({ default: false })
  readonly!: boolean

  //

  @ManyToMany(type => WorkspaceUserXrefEntity, xref => xref.roles)
  usersXref!: WorkspaceUserXrefEntity[]
}

export enum ProjectPermission {
  PROJECT_UPDATE = 'PROJECT_UPDATE',
  PROJECT_DELETE = 'PROJECT_DELETE',

  PROJECT_USER_ACCESS = 'PROJECT_USER_ACCESS',
  PROJECT_USER_CREATE = 'PROJECT_USER_CREATE',
  PROJECT_USER_UPDATE = 'PROJECT_USER_UPDATE',
  PROJECT_USER_DELETE = 'PROJECT_USER_DELETE',

  ENTRY_ACCESS_OWN = 'ENTRY_ACCESS_OWN',
  ENTRY_CREATE_OWN = 'ENTRY_CREATE_OWN',
  ENTRY_UPDATE_OWN = 'ENTRY_UPDATE_OWN',
  ENTRY_DELETE_OWN = 'ENTRY_DELETE_OWN',

  ENTRY_ACCESS_ALL = 'ENTRY_ACCESS_ALL',
  ENTRY_CREATE_ALL = 'ENTRY_CREATE_ALL',
  ENTRY_UPDATE_ALL = 'ENTRY_UPDATE_ALL',
  ENTRY_DELETE_ALL = 'ENTRY_DELETE_ALL',

  TAG_ENTRY_ACCESS = 'TAG_ENTRY_ACCESS',
  TAG_ENTRY_CREATE = 'TAG_ENTRY_CREATE',
  TAG_ENTRY_DELETE = 'TAG_ENTRY_DELETE',
}

@Entity()
export class ProjectRoleEntity extends BaseTenantEntity {
  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  @Column({ type: 'enum', enum: ProjectPermission, array: true })
  permissions!: ProjectPermission[]

  @Column({ default: false })
  readonly!: boolean

  //

  @ManyToMany(type => ProjectUserXrefEntity, xref => xref.roles)
  usersXref!: ProjectUserXrefEntity[]
}

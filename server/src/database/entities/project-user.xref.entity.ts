import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { Lazy } from '../../types'
import { BaseTenantEntity } from './base.entity'
import { ProjectEntity } from './project.entity'
import { ProjectRoleEntity } from './role.entity'
import { UserEntity } from './user.entity'

@Entity()
export class ProjectUserXrefEntity extends BaseTenantEntity {
  @ManyToOne(type => UserEntity, user => user.projectsXRef)
  user!: Lazy<UserEntity>

  @ManyToOne(type => ProjectEntity, project => project.usersXref)
  project!: Lazy<ProjectEntity>

  @ManyToMany(type => ProjectRoleEntity, role => role.usersXref)
  @JoinTable()
  roles!: Lazy<ProjectRoleEntity[]>
}

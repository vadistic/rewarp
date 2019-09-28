import { BaseTenantEntity } from './base.entity'
import { ManyToOne, ManyToMany, JoinTable, Entity } from 'typeorm'
import { UserEntity } from './user.entity'
import { ProjectEntity } from './project.entity'
import { ProjectRoleEntity } from './role.entity'

@Entity()
export class ProjectUserXrefEntity extends BaseTenantEntity {
  @ManyToOne(type => UserEntity, user => user.projectsXRef)
  user!: UserEntity

  @ManyToOne(type => ProjectEntity, project => project.usersXref)
  project!: ProjectEntity

  @ManyToMany(type => ProjectRoleEntity, role => role.usersXref)
  @JoinTable()
  roles!: ProjectRoleEntity[]
}

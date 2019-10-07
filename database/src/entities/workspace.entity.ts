import { Column, Entity, OneToMany } from 'typeorm'
import { BaseGlobalEntity } from './base.entity'
import { WorkspaceUserXrefEntity } from './workspace-user.xref.entity'

@Entity()
export class WorkspaceEntity extends BaseGlobalEntity {
  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  //

  @OneToMany(type => WorkspaceUserXrefEntity, xref => xref.workspace)
  usersXref!: WorkspaceUserXrefEntity[]
}

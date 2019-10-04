import { Column, Entity, OneToMany } from 'typeorm'
import { Lazy } from '../../types'
import { BaseTenantEntity } from './base.entity'
import { EntryEntity } from './entry.entity'
import { ProjectEntity } from './project.entity'

@Entity()
export class ClientEntity extends BaseTenantEntity {
  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  //

  @OneToMany(type => ProjectEntity, project => project.client)
  projects!: Lazy<ProjectEntity[]>

  @OneToMany(type => EntryEntity, entry => entry.client)
  entries!: Lazy<EntryEntity[]>
}

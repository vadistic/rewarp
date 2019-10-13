import { Column, Entity, OneToMany } from 'typeorm'
import { Nullable } from '../types'
import { BaseTenantEntity } from './base.entity'
import { EntryEntity } from './entry.entity'
import { ProjectEntity } from './project.entity'

@Entity()
export class ClientEntity extends BaseTenantEntity {
  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>

  //

  @OneToMany(type => ProjectEntity, project => project.client)
  projects!: ProjectEntity[]

  @OneToMany(type => EntryEntity, entry => entry.client)
  entries!: EntryEntity[]
}

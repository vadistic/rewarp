import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ synchronize: false })
export abstract class BaseGlobalEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ type: 'date' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt!: Date
}

@Entity({ synchronize: false })
export abstract class BaseTenantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @PrimaryColumn({ type: 'text' })
  tenant!: string // uuid = workspaceId

  @CreateDateColumn({ type: 'date' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt!: Date
}

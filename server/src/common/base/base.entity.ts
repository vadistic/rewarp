import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ID } from './base.types'

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id!: ID

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

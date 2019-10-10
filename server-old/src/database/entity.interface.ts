import { BaseEntity } from 'typeorm'

export type Lazy<T> = T | Promise<T>

export type IDType = string

export interface Entity extends BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

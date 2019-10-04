import { BaseEntity } from 'typeorm'

export type Lazy<T> = T | Promise<T>

export type IDType = string
export type GraphQLScalar = null | number | boolean | string | Date

export interface Entity extends BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

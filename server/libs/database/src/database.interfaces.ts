import DataLoader from 'dataloader'
import { Connection, ConnectionOptions } from 'typeorm'

export type Nullable<T> = T | null

export type DatabaseModuleConfig = DatabaseModulePostgresConfig | DatabaseModuleSqliteConfig

export interface DatabaseModulePostgresConfig {
  name?: string
  type: 'postgres'
  host: string
  port: number
  username: string
  password: string
  database: string
  schema: string
  synchronize: boolean
}
export interface DatabaseModuleSqliteConfig {
  name?: string
  type: 'sqlite'
  database: string
  synchronize: boolean
}

export type EntityLoader<E = any> = DataLoader<string, E>

export type ConnectionArg = string | Connection | ConnectionOptions

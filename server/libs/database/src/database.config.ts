import { ConnectionOptions } from 'typeorm'
import { CustomNamingStrategy } from './helpers/naming-strategy'
import { DatabaseModuleConfig } from './database.interfaces'
import {
  ClientEntity,
  EntryEntity,
  ProjectUserXrefEntity,
  ProjectEntity,
  ProjectRoleEntity,
  TagEntity,
  TagEntryXrefEntity,
  UserEntity,
  WorkspaceEntity,
  WorkspaceRoleEntity,
  WorkspaceUserXrefEntity,
} from './entities'

export const ENTITIES = [
  ClientEntity,
  EntryEntity,
  ProjectEntity,
  ProjectRoleEntity,
  ProjectUserXrefEntity,
  TagEntity,
  TagEntryXrefEntity,
  UserEntity,
  WorkspaceEntity,
  WorkspaceRoleEntity,
  WorkspaceRoleEntity,
  WorkspaceUserXrefEntity,
]

export const DATABASE_MODULE_CONFIG: DatabaseModuleConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  synchronize: false,
}

/**
 * Overegineered setup for plugable configuration
 */
export function getConnectionOptions(config: DatabaseModuleConfig): ConnectionOptions {
  if (config.type === 'postgres') {
    return {
      name: 'default',
      entities: ENTITIES,
      synchronize: false,
      logging: ['error'],
      logger: 'simple-console',
      namingStrategy: new CustomNamingStrategy(),
      ssl: true,
      ...config,
    }
  }

  if (config.type === 'sqlite') {
    return {
      name: 'default',
      entities: ENTITIES,
      synchronize: false,
      logging: ['error'],
      logger: 'simple-console',
      namingStrategy: new CustomNamingStrategy(),
      ...config,
    }
  }
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm'
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

/**
 * Overegineered setup for plugable configuration
 */
export function getTypeOrmModuleOptions(config: DatabaseModuleConfig) {
  const connection: ConnectionOptions = {
    name: 'default',
    entities: ENTITIES,
    synchronize: false,
    logging: ['error'],
    logger: 'simple-console',
    namingStrategy: new CustomNamingStrategy(),
    ...config,
  }

  if (connection.type === 'postgres') {
    // ssl needed for heroku
    connection.ssl === true
  }

  // separate because of pesky typing intersection on union
  const moduleOnly: Omit<TypeOrmModuleOptions, keyof ConnectionOptions> = {}

  const module: TypeOrmModuleOptions = {
    ...connection,
    ...moduleOnly,
  }

  return { connection, module }
}

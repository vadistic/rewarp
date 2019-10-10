import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { CONFIG } from '../config/config'
import { ClientEntity } from './entities/client.entity'
import { EntryEntity } from './entities/entry.entity'
import { ProjectUserXrefEntity } from './entities/project-user.xref.entity'
import { ProjectEntity } from './entities/project.entity'
import { ProjectRoleEntity, WorkspaceRoleEntity } from './entities/role.entity'
import { TagEntryXrefEntity } from './entities/tag-entry.xref.entity'
import { TagEntity } from './entities/tag.entity'
import { UserEntity } from './entities/user.entity'
import { WorkspaceUserXrefEntity } from './entities/workspace-user.xref.entity'
import { WorkspaceEntity } from './entities/workspace.entity'
import { CustomNamingStrategy } from './utils/naming-strategy'

export const databaseEntities = [
  ClientEntity,
  EntryEntity,
  ProjectUserXrefEntity,
  ProjectEntity,
  WorkspaceRoleEntity,
  ProjectRoleEntity,
  TagEntryXrefEntity,
  TagEntity,
  UserEntity,
  WorkspaceUserXrefEntity,
  WorkspaceEntity,
]

export const databaseOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT,
  username: CONFIG.DB_USERNAME,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  schema: CONFIG.DB_SCHEMA,
  entities: databaseEntities,
  synchronize: false,
  logging: CONFIG.LOG_LEVEL_TORM,
  logger: CONFIG.LOG_TYPE_TORM,
  // ssl needed for heroku
  ssl: true,
  namingStrategy: new CustomNamingStrategy(),
}

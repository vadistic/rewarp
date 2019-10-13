import { join } from 'path'
import { ConnectionOptions } from 'typeorm'
import { CustomNamingStrategy } from './utils/naming-strategy'

import * as entities from './entities'

export const ENTITIES = Object.values(entities) as Function[]

export const CONNECTION_OPTIONS: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: ENTITIES,
  synchronize: false,
  logging: ['log', 'info', 'warn'],
  logger: 'advanced-console',
  // ssl needed for heroku
  ssl: true,
  namingStrategy: new CustomNamingStrategy(),
}

export const TEST_CONNECTION_OPTIONS: ConnectionOptions = {
  type: 'sqlite',
  database: join(process.cwd(), '../test/db.sqlite'),
  entities: ENTITIES,
  synchronize: true,
  logging: ['error', 'warn'],
  logger: 'advanced-console',
  namingStrategy: new CustomNamingStrategy(),
}

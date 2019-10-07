import { ConnectionOptions } from 'typeorm'
import { CustomNamingStrategy } from './utils/naming-strategy'

import * as entities from './entities'

export const databaseOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA || 'public',
  entities: Object.values(entities) as Function[],
  synchronize: false,
  logging: ['error', 'warn'],
  logger: 'advanced-console',
  // ssl needed for heroku
  ssl: true,
  namingStrategy: new CustomNamingStrategy(),
}

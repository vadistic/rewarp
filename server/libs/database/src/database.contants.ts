import { join } from 'path'
import { DatabaseModuleConfig } from './database.interfaces'

export const DATABASE_MODULE_CONFIG: DatabaseModuleConfig = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  synchronize: true,
}

export const DATABASE_MODULE_TEST_CONFIG: DatabaseModuleConfig = {
  name: 'default',
  type: 'sqlite',
  database: join(process.cwd(), './test/db.sqlite'),
  synchronize: true,
}

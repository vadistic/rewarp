import { LogLevel } from '@nestjs/common'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const CONFIG = {
  APP_PORT: 3001,

  LOG_LEVEL_NEST: ['debug', 'error', 'warn', 'verbose', 'log'] as LogLevel[],
  LOG_LEVEL_TORM: ['error', 'warn'] as TypeOrmModuleOptions['logging'],
  LOG_TYPE_TORM: 'advanced-console' as TypeOrmModuleOptions['logger'],

  JWT_SECRET: 'MySecret',
  JWT_ACCESS_EXPIRE: '30m',
  JWT_REFRESH_EXPIRE: '14d',

  SALT_ROUNDS: 12,

  DB_TYPE: 'postgres',
  DB_HOST: process.env.PGHOST || 'localhost',
  DB_PORT: process.env.PGPORT ? +process.env.PGPORT : 5432,
  DB_USERNAME: process.env.PGUSER || 'root',
  DB_PASSWORD: process.env.PGPASSWORD || 'root',
  DB_NAME: process.env.PGDATABASE || 'test',
  DB_SCHEMA: process.env.PGSCHEMA || 'public',
}

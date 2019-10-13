import { LogLevel } from '@nestjs/common'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const CONFIG = {
  APP_PORT: 3000,

  LOG_LEVEL_NEST: ['debug', 'error', 'warn', 'verbose', 'log'] as LogLevel[],
  LOG_LEVEL_TORM: ['error', 'warn'] as TypeOrmModuleOptions['logging'],
  LOG_TYPE_TORM: 'advanced-console' as TypeOrmModuleOptions['logger'],

  JWT_SECRET: 'MySecret',
  JWT_ACCESS_EXPIRE: '30m',
  JWT_REFRESH_EXPIRE: '14d',

  SALT_ROUNDS: 12,
}

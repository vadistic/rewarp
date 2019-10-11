import { join } from 'path'
import { DatabaseModuleConfig, DatabaseModuleSqliteConfig } from '../src'

export function getDatabaseModuleTestConfig(partial?: Partial<DatabaseModuleSqliteConfig>): DatabaseModuleConfig {
  const timestamp = new Date().getTime()

  return {
    name: 'default',
    type: 'sqlite',
    database: join(__dirname, `../test/tmp/db.${timestamp}.sqlite`),
    synchronize: true,
    ...partial,
  }
}

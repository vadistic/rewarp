import { DynamicModule, Provider, Module, Global } from '@nestjs/common'
import { TypeOrmModule, getConnectionToken } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { DatabaseModuleConfig } from './database.interfaces'
import { getConnectionOptions } from './database.config'
import { DatabaseService } from './database.service'
import { getEntityServiceToken } from './database.decorators'
import { EntityService } from './entity.service'

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(config: DatabaseModuleConfig): DynamicModule {
    const options = getConnectionOptions(config)

    const entities = options.entities.filter((entity): entity is Function => {
      if (typeof entity !== 'function') {
        // TODO: logger.debug
        console.warn(DatabaseModule.name, `Entity should be a class extending BaseEntity`, entity)
        return false
      }

      return true
    })

    const connectionToken = getConnectionToken(options)

    const providers = entities.map<Provider>(entity => {
      return {
        provide: getEntityServiceToken(entity),
        inject: [connectionToken],
        useFactory: (connection: Connection) => new EntityService(entity, connection),
      }
    })

    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(options)],
      providers: [DatabaseService, ...providers],
      exports: [DatabaseService, ...providers],
    }
  }
}

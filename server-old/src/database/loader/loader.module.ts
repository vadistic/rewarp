import { DynamicModule, Module, Provider, Scope } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/typeorm'
import { Connection, ConnectionOptions } from 'typeorm'
import { DEFAULT_CONNECTION_NAME } from './loader.contants'
import { LoaderService } from './loader.service'
import { getLoaderToken } from './loader.utils'

@Module({})
export class LoaderModule {
  static forFeature(
    entities: Function[] = [],
    connection: Connection | ConnectionOptions | string = DEFAULT_CONNECTION_NAME,
  ): DynamicModule {
    const providers = entities.map(
      (entity): Provider => ({
        provide: getLoaderToken(entity, connection),
        inject: [getConnectionToken(connection)],
        useFactory: LoaderService.create(entity),
        scope: Scope.REQUEST,
      }),
    )

    return {
      module: LoaderModule,
      providers: providers,
      exports: providers,
    }
  }
}

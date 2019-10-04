import { getConnectionPrefix } from '@nestjs/typeorm/dist/common'
import { Connection, ConnectionOptions } from 'typeorm'
import { isNullOrUndefined } from 'util'
import { DEFAULT_CONNECTION_NAME } from './loader.contants'

// based on
// https://github.com/nestjs/typeorm/blob/master/lib/common/typeorm.utils.ts

export const getLoaderToken = (
  entity: Function,
  connection: Connection | ConnectionOptions | string = DEFAULT_CONNECTION_NAME,
) => {
  if (isNullOrUndefined(entity)) {
    throw new Error(`@InjectLoader() circural dependency`)
  }

  const connectionPrefix = getConnectionPrefix(connection)

  return connectionPrefix + entity.name + `Loader`
}

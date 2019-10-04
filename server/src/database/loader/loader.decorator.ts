import { Inject } from '@nestjs/common'
import { DEFAULT_CONNECTION_NAME } from './loader.contants'
import { getLoaderToken } from './loader.utils'

export const InjectLoader = (entity: Function, connection: string = DEFAULT_CONNECTION_NAME) =>
  Inject(getLoaderToken(entity, connection))

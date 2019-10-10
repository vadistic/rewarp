import { getConnectionPrefix } from '@nestjs/typeorm'
import { Inject } from '@nestjs/common'
import { ConnectionArg } from './database.interfaces'

export function getEntityServiceToken(entity: Function, connection?: ConnectionArg) {
  const prefix = getConnectionPrefix(connection)
  return prefix + entity.name + 'Service'
}

export function InjectEntityService(entity: Function, connection?: ConnectionArg) {
  return Inject(getEntityServiceToken(entity, connection))
}

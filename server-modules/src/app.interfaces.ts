import { IncomingMessage, ServerResponse } from 'http'
import { ModuleContext } from '@graphql-modules/core'
import { DatabaseContext } from './common/database/database.interfaces'

export interface Session {
  req: IncomingMessage
  res: ServerResponse
}

export type AppContext = ModuleContext<DatabaseContext>

/* eslint-disable */
import 'reflect-metadata'
/* eslint-enable */

import { ApolloServer, Config } from 'apollo-server-micro'
import { NowRequest, NowResponse } from '@now/node'
import { AppModule } from './app.module'
import { DatabaseProvider } from './common/database/database.provider'

export const { injector, schema } = AppModule

export const serverConfig: Config = {
  schema: schema,
  debug: process.env.NODE_ENV === 'development',
  context: session => session,
  playground: true,
  introspection: true,
}

const server = new ApolloServer(serverConfig)

const main = async (req: NowRequest, res: NowResponse) => {
  await injector.get(DatabaseProvider).init()

  return server.createHandler()(req, res)
}

export default main

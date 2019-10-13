/* eslint-disable */
import 'reflect-metadata'
/* eslint-enable */

import { ApolloServer, Config } from 'apollo-server-express'
import express from 'express'
import { NowRequest, NowResponse } from '@now/node'
import { AppModule } from './app.module'
import { DatabaseProvider } from './common/database/database.provider'

export const { injector, schema } = AppModule

export const serverConfig: Config = {
  schema: schema,
  playground: true,
  introspection: true,
  debug: true,

  context: session => session,
}

const server = new ApolloServer(serverConfig)

const instance = express()

server.applyMiddleware({ app: instance, path: '/' })

export { server, instance }

export default async (req: NowRequest, res: NowResponse) => {
  await injector.get(DatabaseProvider).init()

  return instance(req, res)
}

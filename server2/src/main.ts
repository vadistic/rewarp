console.log('TOP MAIN')

import { ApolloServer, Config } from 'apollo-server-micro'
import { AppModule } from './app.module'

/* eslint-disable */
import 'reflect-metadata'
/* eslint-enable */

export const serverConfig: Config = {
  schema: AppModule.schema,
  debug: process.env.NODE_ENV === 'development',
  context: session => session,
  playground: true,
  introspection: true,
}

const server = new ApolloServer(serverConfig)

console.log('BOTTOM MAIN')

export default server.createHandler()

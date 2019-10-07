import { ApolloServer, Config } from 'apollo-server-micro'
import { AppModule } from './app.module'

/* eslint-disable */
import 'reflect-metadata'
import './utils/load-env'
/* eslint-enable */

export const serverConfig: Config = {
  schema: AppModule.schema,
  debug: process.env.NODE_ENV === 'development',
  context: session => session,
  playground: true,
  introspection: true,
}

const server = new ApolloServer(serverConfig)

export default server.createHandler()

import { ApolloServer, Config } from 'apollo-server-micro'
import { AppModule } from './app.module'
import './load-env'

export const serverConfig: Config = {
  schema: AppModule.schema,
  debug: process.env.NODE_ENV === 'development',
  context: session => session,
  playground: true,
  introspection: true,
}

const server = new ApolloServer(serverConfig)

export default server.createHandler()

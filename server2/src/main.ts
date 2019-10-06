import { ApolloServer, Config, gql } from 'apollo-server-micro'
import './load-env'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

export const serverConfig: Config = {
  typeDefs,
  resolvers,
  debug: process.env.NODE_ENV === 'development',
  playground: true,
  introspection: true,
}

const server = new ApolloServer(serverConfig)

export default server.createHandler()

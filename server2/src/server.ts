import { ApolloServer } from 'apollo-server'
import { serverConfig } from './main'

const server = new ApolloServer(serverConfig)

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server started: ${url}`)
})

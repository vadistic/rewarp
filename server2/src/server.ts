import { ApolloServer } from 'apollo-server'
import { serverConfig } from './main'

// disabled just in case
if (process.env.NODE_ENV === 'development') {
  const server = new ApolloServer(serverConfig)

  server.listen(3000).then(({ url }) => {
    console.log(`🚀 Server started: ${url}`)
  })
}

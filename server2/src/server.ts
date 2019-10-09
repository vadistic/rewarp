import { ApolloServer } from 'apollo-server'
import { serverConfig, injector } from './main'
import { DatabaseProvider } from './common/database/database.provider'

const main = async () => {
  await injector.get(DatabaseProvider).init()

  const server = new ApolloServer(serverConfig)

  server.listen(3000).then(({ url }) => {
    console.log(`🚀 Server started: ${url}`)
  })
}

main()

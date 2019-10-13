import dotenv from 'dotenv'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '../../../.env.development' })
}

import { DatabaseProvider } from './common/database/database.provider'
import { injector, server, instance } from '.'

const bootstrap = async () => {
  await injector.get(DatabaseProvider).init()

  instance.listen({ port: 3000 }, () => {
    console.log(`🚀 Server started: http://localhost:${3000}${server.graphqlPath}`)
  })
}

bootstrap()

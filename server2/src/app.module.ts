import { GraphQLModule, Logger } from '@graphql-modules/core'
import { DatabaseModule } from './common/database/database.module'
import { CommonGraphqlModule } from './common/graphql'
import { userTypeDefs } from './modules/user/user.graphql'
import { projectTypeDefs } from './modules/project/project.graphql'
import { userResolver } from './modules/user/user.resolver'
import { projectResolver } from './modules/project/project.resolver'

const CustomLogger: Logger = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  clientError: console.error,
}

export const AppModule = new GraphQLModule({
  name: 'AppModule',
  typeDefs: [userTypeDefs, projectTypeDefs],
  resolvers: [userResolver, projectResolver] as any,
  imports: [DatabaseModule, CommonGraphqlModule],
  logger: CustomLogger,
  context: { appModuleCtx: 'APP_MODULE_CTX' },
})

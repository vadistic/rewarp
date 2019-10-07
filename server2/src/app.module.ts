import { GraphQLModule, Logger } from '@graphql-modules/core'
import { UserModule } from './modules/user/user.module'

const Logger: Logger = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  clientError: console.error,
}

export const AppModule = new GraphQLModule({
  imports: [UserModule],
  logger: Logger,
  context: { appModuleCtx: 'APP_MODULE_CTX' },
})

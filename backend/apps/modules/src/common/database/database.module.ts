import { GraphQLModule, ModuleContext } from '@graphql-modules/core'
import { DatabaseProvider } from './database.provider'
import { DatabaseContext } from './database.interfaces'
import { DatabaseUtilProvider } from './database-util.provider'
import { DatabaseLoaderProvider } from './database-loader.provider'

export const DatabaseModule = new GraphQLModule({
  name: 'DatabaseModule',
  providers: [DatabaseProvider, DatabaseUtilProvider, DatabaseLoaderProvider],
  context: (session, ctx: ModuleContext): DatabaseContext => ({
    db: ctx.injector.get(DatabaseProvider),
  }),
})

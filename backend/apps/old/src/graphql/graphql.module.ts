import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { DateScalar } from './scalar/date.scalar'

@Module({
  providers: [DateScalar],
  imports: [
    GraphQLModule.forRoot({
      context: (session: any) => session,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(__dirname, '../schema.graphql'),
      path: '/',
      // https://github.com/nestjs/graphql/issues/295
      // fieldResolverEnhancers: ['guards', 'interceptors'],
    }),
  ],
  exports: [DateScalar],
})
export class GraphqlModule {}

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { DateScalar } from './scalar/date.scalar'

@Module({
  providers: [DateScalar],
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.graphql',
      path: '/',
      // https://github.com/nestjs/graphql/issues/295
      fieldResolverEnhancers: ['guards', 'interceptors'],
    }),
  ],
  exports: [DateScalar],
})
export class GraphqlModule {}

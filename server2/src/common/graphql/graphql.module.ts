import { GraphQLModule } from '@graphql-modules/core'
import * as typeDefs from './graphql.graphql'
import { DateTimeScalar } from './scalars/date.scalar'

export const CommonGraphqlModule = new GraphQLModule({
  typeDefs: Object.values(typeDefs),
  resolvers: {
    DateTime: DateTimeScalar,
  },
})

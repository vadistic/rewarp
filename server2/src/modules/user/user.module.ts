import { GraphQLModule } from '@graphql-modules/core'
import * as typeDefs from './user.graphql'
import { resolvers } from './user.resolver'

// eslint-disable-next-line
import { CommonGraphqlModule } from '../../common/graphql'

export const UserModule = new GraphQLModule({
  imports: [CommonGraphqlModule],
  typeDefs: Object.values(typeDefs),
  resolvers,
})

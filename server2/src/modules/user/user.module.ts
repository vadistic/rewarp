import { GraphQLModule } from '@graphql-modules/core'
import { CommonGraphqlModule } from '../../common/graphql/graphql.module'
import * as typeDefs from './user.graphql'

export const UserModule = new GraphQLModule({
  name: 'UserModule',
  imports: [CommonGraphqlModule],
  typeDefs: Object.values(typeDefs),
  resolvers: {
    Query: {
      user: (root, args, ctx, info) => {
        console.log(`UserMod`, Object.keys(ctx))

        return {
          field: 'nested',
        }
      },
    },
  },

  resolversComposition: {},
})

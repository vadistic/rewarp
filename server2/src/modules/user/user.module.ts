import { GraphQLModule } from '@graphql-modules/core'
import { gql } from 'apollo-server-micro'

export const UserModule = new GraphQLModule({
  typeDefs: gql`
    type Query {
      myData: Data
    }

    type Data {
      field: String
    }
  `,
  resolvers: config => ({
    Query: {
      myData: () => ({
        field: 'nested',
      }),
    },
  }),
})

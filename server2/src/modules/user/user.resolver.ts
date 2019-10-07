import { Resolvers } from '../../generated'

export const resolvers: Resolvers = {
  Query: {
    user: () => {
      return {
        id: 'abc',
      }
    },
  },
}

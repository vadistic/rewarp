import { Resolvers } from './user.gen.types'

export const resolvers: Resolvers = {
  Query: {
    user: () => {
      return {
        id: '1',
        name: 'Jakub Wadas',
      }
    },
    users: () => {
      return [
        {
          id: '1',
          name: 'Jakub Wadas',
        },
      ]
    },
  },
}

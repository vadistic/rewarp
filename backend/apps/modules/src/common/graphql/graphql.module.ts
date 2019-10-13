import { GraphQLModule } from '@graphql-modules/core'
import { DateTimeScalar } from './date-time.scalar'
import { DateTimeGql } from './scalars.graphql'

import {
  IdSearchInputGql,
  IntSearchInputGql,
  DateTimeSearchInputGql,
  FloatSearchInputGql,
  BooleanSearchInputGql,
  StringSearchInputGql,
} from './search-inputs.graphql'

const typeDefs = [
  DateTimeGql,
  IdSearchInputGql,
  BooleanSearchInputGql,
  StringSearchInputGql,
  IntSearchInputGql,
  FloatSearchInputGql,
  DateTimeSearchInputGql,
]

export const CommonGraphqlModule = new GraphQLModule({
  typeDefs,
  resolvers: {
    DateTime: DateTimeScalar,
  },
})

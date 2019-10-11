export * from './models/input-fields.mixin'
export * from './models/pagination-args.mixin'

import { scalarsTypeDefs } from './models/scalars.graphql'
import { searchInputsTypeDefs } from './models/search-inputs.graphql'
import { DateTimeScalar } from './scalars/date-time.scalar'

export const graphqlTypeDefs = [searchInputsTypeDefs, scalarsTypeDefs].join('\n')

export const graphqlResolvers = {
  DateTime: DateTimeScalar,
}

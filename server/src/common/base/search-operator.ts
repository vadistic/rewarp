import { StringMap, KeysOfUnion } from '../../utils/types'
import { SearchInput } from './dto/search.input'
import {
  FindOperator,
  Equal,
  In,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  Not,
  Raw,
} from 'typeorm'

type SearchOpTuple = [KeysOfUnion<SearchInput>, any]

/**
 * Folowing typeorm convention where is an array of OR and one element is AND
 *
 * searchOperator = my search inputs
 * findOperator = typeorm values
 */
export const mapSearchOperators = <WhereInput>(where?: WhereInput[]) => {
  if (!where) {
    return undefined
  }

  return where.map(el => {
    const result: StringMap<FindOperator<any>> = {}

    for (const [field, search] of Object.entries(el)) {
      const operators = Object.entries(search) as SearchOpTuple[]

      // cannot eg. combine eq with startsWith
      if (operators.length > 1) {
        throw Error(`Cannot combine multiple search operators! (${JSON.stringify(operators)})`)
      }

      // all undef
      if (operators.length === 0) {
        continue
      }

      result[field] = getFindOperator(operators[0])
    }

    return result
  })
}

const getFindOperator = ([op, value]: SearchOpTuple) => {
  switch (op) {
    case 'eq':
      return Equal(value)
    case 'in':
      return In(value)
    case 'not':
      return Not(value)
    case 'contains':
      return Raw(alias => `LOWER(${alias}) LIKE LOWER('%${value}%')`)
    case 'startsWith':
      return Raw(alias => `LOWER(${alias}) LIKE LOWER('${value}%')`)
    case 'endsWith':
      return Raw(alias => `LOWER(${alias}) LIKE LOWER('%${value}')`)
    case 'lt':
      return LessThan(value)
    case 'lte':
      return LessThanOrEqual(value)
    case 'gt':
      return MoreThan(value)
    case 'gte':
      return MoreThanOrEqual(value)
  }
}

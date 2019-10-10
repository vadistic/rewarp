import {
  Equal,
  FindOperator,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Raw,
} from 'typeorm'
import { KeysOfUnion, StringMap } from '../../common/types'
import { SearchInput } from '../../graphql/base/dto/search.input'
import {} from '../entity.interface'

type SearchOpTuple = [KeysOfUnion<SearchInput>, any]

const mapFindOperator = ([op, value]: SearchOpTuple) => {
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

export const mapWhere = <WhereInput>(where?: WhereInput) => {
  if (!where) {
    return undefined
  }

  const result: StringMap<FindOperator<any>> = {}

  for (const [field, search] of Object.entries(where)) {
    const operators = Object.entries(search) as SearchOpTuple[]

    // cannot eg. combine eq with startsWith
    if (operators.length > 1) {
      throw Error(`Cannot combine multiple search operators! (${JSON.stringify(operators)})`)
    }

    // all undef
    if (operators.length === 0) {
      continue
    }

    result[field] = mapFindOperator(operators[0])
  }

  return result
}

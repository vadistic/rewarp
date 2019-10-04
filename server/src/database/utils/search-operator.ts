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
import { SearchInput } from '../../common/base/dto/search.input'
import { KeysOfUnion, StringMap } from '../../utils/types'

type SearchOpTuple = [KeysOfUnion<SearchInput>, any]

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

export const getWhere = <WhereInput>(where?: WhereInput) => {
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

    result[field] = getFindOperator(operators[0])
  }

  return result
}

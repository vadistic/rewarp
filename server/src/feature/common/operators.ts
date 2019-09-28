import { Equal, FindOperator, In, IsNull, LessThan, MoreThan, Not, Raw } from 'typeorm'

export const mapFindOperator = <T>([key, value]: [string, any]): [string, FindOperator<T>] => {
  const [attr, operator = 'eq'] = key.split('_')

  switch (operator) {
    case 'eq':
      if (value === null) {
        return [attr, IsNull()]
      }
      return [attr, Equal(value)]
    case 'not':
      return [attr, Not(value)]
    case 'lt':
      return [attr, LessThan(value)]
    case 'lte':
      return [attr, Not(MoreThan(value))]
    case 'gt':
      return [attr, MoreThan(value)]
    case 'gte':
      return [attr, Not(LessThan(value))]
    case 'in':
      return [attr, In(value)]
    case 'contains':
      return [attr, Raw(alias => `LOWER(${alias}) LIKE LOWER('%${value}%')`)]
    case 'startsWith':
      return [attr, Raw(alias => `LOWER(${alias}) LIKE LOWER('${value}%')`)]
    case 'endsWith':
      return [attr, Raw(alias => `LOWER(${alias}) LIKE LOWER('%${value}')`)]
    default:
      throw new Error(`Can't find operator ${operator}`)
  }
}

// ! make it one loop with skipping of undefs

export const mapFindConditions = (where: any) =>
  Object.entries(where)
    .map(mapFindOperator)
    .map(([attr, op]) => ({ [attr]: op }))

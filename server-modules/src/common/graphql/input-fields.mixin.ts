import { regexParse, RegexParseField } from './regex-parse'

const SCALAR_TYPES = ['ID', 'String', 'Boolean', 'Int', 'Float', 'DateTime']
const SYSTEM_FIELDS = ['id', 'createdAt', 'updatedAt']

const SCALAR_SERACH_MAP = {
  ID: 'IdSearchInput',
  String: 'StringSearchInput',
  Boolean: 'BooleanSearchInput',
  Int: 'IntSearchInput',
  Float: 'FloatSearchInput',
  DateTime: 'DateTimeSearchInput',
}

const isSystemField = (field: RegexParseField) => SYSTEM_FIELDS.includes(field.name)
const isScalarField = (field: RegexParseField) => SCALAR_TYPES.includes(field.type)
const isSearchableField = (field: RegexParseField) => Object.keys(SCALAR_SERACH_MAP).includes(field.type)

export function createFields(source: string, omit: string[] = []) {
  const { fields } = regexParse(source)

  return fields
    .filter(field => isScalarField(field) && !isSystemField(field) && !omit.includes(field.name))
    .map(field => field.row)
    .join('\n')
}

export function updateFields(source: string, omit: string[] = []) {
  const { fields } = regexParse(source)

  return fields
    .filter(field => isScalarField(field) && !isSystemField(field) && !omit.includes(field.name))
    .map(field => (field.nonNullable ? field.row.replace(/!$/, '') : field.row))
    .join('\n')
}

export function whereFields(source: string, omit: string[] = []) {
  const { fields } = regexParse(source)

  return fields
    .filter(field => isSearchableField(field) && !omit.includes(field.name))
    .map(field => `${field.name}: ${SCALAR_SERACH_MAP[field.type as keyof typeof SCALAR_SERACH_MAP]}`)
    .join('\n')
}

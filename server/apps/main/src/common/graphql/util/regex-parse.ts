/* eslint-disable no-useless-escape */

const headingRegex = /^(?:\s*)([^{]+)(?: {)/
const nameRegex = /(?:type|input) ([A-z]+)/

const fieldRegex = /(?:"""([^"]+)"""[\s]*)*([A-z]+)(?:\([^)]+\))?:[\s\[]*([A-z]+)[\]!]*/
// it's the same, but with g flag
const rowRegex = /(?:"""([^"]+)"""[\s]*)*([A-z]+)(?:\([^)]+\))?:[\s\[]*([A-z]+)[\]!]*/g

export interface RegexParseField {
  row: string
  name: string
  type: string
  nonNullable: boolean
  description?: string
}

export interface RegexParseResult {
  name: string
  heading: string
  rows: string[]
  fields: RegexParseField[]
}

export function regexParse(source: string): RegexParseResult {
  const [, heading] = source.match(headingRegex) || []
  const [, name] = source.match(nameRegex) || []
  const rows = source.match(rowRegex) || []

  const fields = rows.map(row => {
    const [, description, name, type] = row.match(fieldRegex) || []

    const nonNullable = row[row.length - 1] === '!'

    return {
      row,
      name,
      type,
      nonNullable,
      description,
    }
  })

  return {
    name,
    heading,
    rows,
    fields,
  }
}

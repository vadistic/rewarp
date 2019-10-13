import { regexParse } from '../regex-parse'

describe(`graphql > regex-parse`, () => {
  const Type = /* GraphQL */ `
    @myDirectivew('value')
    type User {
      id: ID!
      # some comment
      createdAt: DateTime!
      """some description"""
      updatedAt: DateTime!

      nonNullableStr: String!
      nullableStr: String
      nullableStrArr: [String!]
      nonNullableStrArr: [String!]!

      relation: Post!
    }
  `

  const { name, heading, fields, rows } = regexParse(Type)

  it(`parses type name`, () => {
    expect(name).toBe('User')
  })

  it(`parses type heading`, () => {
    expect(heading.replace(/\s/g, '')).toBe(`@myDirectivew('value')typeUser`)
  })

  it(`handles type description`, () => {
    expect(fields[2].description).toBe(`some description`)

    expect(rows[2].replace(/\s/g, '')).toBe(
      `"""some description"""
      updatedAt: DateTime!`.replace(/\s/g, ''),
    )
  })

  it(`returns parsed fields`, () => {
    expect(fields[4]).toEqual({
      row: 'nullableStr: String',
      name: 'nullableStr',
      type: 'String',
      nonNullable: false,
      description: undefined,
    })

    expect(fields[6]).toEqual({
      row: 'nonNullableStrArr: [String!]!',
      name: 'nonNullableStrArr',
      type: 'String',
      nonNullable: true,
      description: undefined,
    })
  })

  it(`is fast`, () => {
    const hrstart = process.hrtime()

    Array.from({ length: 10 }).map(() => regexParse(Type))

    const hrend = process.hrtime(hrstart)

    const ms = hrend[1] / 1000000

    // 0.05 ms is ok
    expect(ms).toBeLessThan(1)
  })
})

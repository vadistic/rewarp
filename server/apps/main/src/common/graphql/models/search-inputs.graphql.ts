const IdSearchInput = /* GraphQL */ `
  input IdSearchInput {
    eq: String
    in: [String!]
    not: String
  }
`

const BooleanSearchInput = /* GraphQL */ `
  input BooleanSearchInput {
    eq: Boolean
    in: [Boolean!]
    not: Boolean
  }
`

const StringSearchInput = /* GraphQL */ `
  input StringSearchInput {
    eq: String
    in: [String!]
    not: String

    contains: String
    startsWith: String
    endsWith: String
  }
`

const FloatSearchInput = /* GraphQL */ `
  input FloatSearchInput {
    eq: Float
    in: [Float!]
    not: Float

    lt: Float
    lte: Float
    gt: Float
    gte: Float
  }
`

const IntSearchInput = /* GraphQL */ `
  input IntSearchInput {
    eq: Int
    in: [Int!]
    not: Int

    lt: Int
    lte: Int
    gt: Int
    gte: Int
  }
`

const DateTimeSearchInput = /* GraphQL */ `
  input DateTimeSearchInput {
    eq: DateTime
    in: [DateTime!]
    not: DateTime

    lt: DateTime
    lte: DateTime
    gt: DateTime
    gte: DateTime
  }
`

export const searchInputsTypeDefs = [
  IdSearchInput,
  BooleanSearchInput,
  StringSearchInput,
  FloatSearchInput,
  IntSearchInput,
  DateTimeSearchInput,
].join('\n')

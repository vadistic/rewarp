export const IdSearchInputGql = /* GraphQL */ `
  input IdSearchInput {
    eq: String
    in: [String!]
    not: String
  }
`

export const BooleanSearchInputGql = /* GraphQL */ `
  input BooleanSearchInput {
    eq: Boolean
    in: [Boolean!]
    not: Boolean
  }
`

export const StringSearchInputGql = /* GraphQL */ `
  input StringSearchInput {
    eq: String
    in: [String!]
    not: String

    contains: String
    startsWith: String
    endsWith: String
  }
`

export const FloatSearchInputGql = /* GraphQL */ `
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

export const IntSearchInputGql = /* GraphQL */ `
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

export const DateTimeSearchInputGql = /* GraphQL */ `
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

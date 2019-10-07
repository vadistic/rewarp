export const User = /* GraphQL */ `
  type User {
    id: ID!

    createdAt: DateTime!
    updatedAt: DateTime!

    name: String
    description: String
  }
`

export const Query = /* GraphQL */ `
  type Query {
    user(id: ID!): User

    users: [User!]!
  }
`

import { createFields, updateFields, whereFields, paginationArgs } from '../../common/graphql'

const OMIT: string[] = []

export const UserGql = /* GraphQL */ `
  type User {
    id: ID!

    createdAt: DateTime!
    updatedAt: DateTime!

    name: String
    description: String
  }
`

export const UserCreateInputGql = /* GraphQL */ `
  input UserCreateInput {
    ${createFields(UserGql, OMIT)}
  }
`

export const UserUpdateInputGql = /* GraphQL */ `
  input UserUpdateInput {
    ${updateFields(UserGql, OMIT)}
  }
`

export const UserWhereInputGql = /* GraphQL */ `
  input UserWhereInput {
    ${whereFields(UserGql, OMIT)}
  }
`

export const QueryGql = /* GraphQL */ `
  type Query {
    user(id: ID!): User
    users(${paginationArgs}): [User!]!
  }

`

export const MutationGql = /* GraphQL */ `
  type Mutation {
    createUser(data: UserCreateInput!): User!
    updateUser(id: ID!, data: UserUpdateInput!): User!
  }
`

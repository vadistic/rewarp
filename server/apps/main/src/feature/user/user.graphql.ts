import { createFields, updateFields, paginationArgs, whereFields } from '../../common/graphql'

const OMIT: string[] = []

const User = /* GraphQL */ `
  type User {
    id: ID!

    createdAt: DateTime!
    updatedAt: DateTime!

    name: String
    description: String

    projects: [Project!]!
  }
`

const UserCreateInput = /* GraphQL */ `
  input UserCreateInput {
    ${createFields(User, OMIT)}
  }
`

const UserUpdateInput = /* GraphQL */ `
  input UserUpdateInput {
    ${updateFields(User, OMIT)}
  }
`

const UserWhereInput = /* GraphQL */ `
  input UserWhereInput {
    ${whereFields(User, OMIT)}
  }
`

const Query = /* GraphQL */ `
  type Query {
    user(id: ID!): User
    users(where: UserWhereInput!, ${paginationArgs}): [User!]!
  }
`

const Mutation = /* GraphQL */ `
  type Mutation {
    createUser(data: UserCreateInput!): User!
    updateUser(id: ID!, data: UserUpdateInput!): User!
    deleteUser(id: ID!, data: UserUpdateInput!): User!
  }
`

export const userTypeDefs = [User, UserCreateInput, UserUpdateInput, UserWhereInput, Query, Mutation].join('\n')

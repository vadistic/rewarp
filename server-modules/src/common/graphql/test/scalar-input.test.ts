import { gql } from 'apollo-server'
import { print } from 'graphql'
import { createFields, updateFields } from '../input-fields.mixin'

describe(`graphql > scalar-input`, () => {
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
  const CreateInput = /* GraphQL */ `
    input CreateInput {
      ${createFields(Type)}
    }
  `

  const UpdateInput = /* GraphQL */ `
    input UpdateInput {
      ${updateFields(Type)}
    }
  `

  it(`generates create input fields`, () => {
    const fixture = /* GraphQL */ `
      input CreateInput {
        nonNullableStr: String!
        nullableStr: String
        nullableStrArr: [String!]
        nonNullableStrArr: [String!]!
      }
    `

    expect(print(gql(CreateInput))).toEqual(print(gql(fixture)))
  })

  it(`generates update input fields`, () => {
    const fixture = /* GraphQL */ `
      input UpdateInput {
        nonNullableStr: String
        nullableStr: String
        nullableStrArr: [String!]
        nonNullableStrArr: [String!]
      }
    `

    expect(print(gql(UpdateInput))).toEqual(print(gql(fixture)))
  })
})

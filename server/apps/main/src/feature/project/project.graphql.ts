import { paginationArgs, createFields, updateFields, whereFields } from '../../common/graphql'

const OMIT: string[] = []

const Project = /* GraphQL */ `
  type Project {
    id: ID!

    createdAt: DateTime!
    updatedAt: DateTime!

    name: String!
    description: String

    projects: [Project!]!
  }
`

const ProjectCreateInput = /* GraphQL */ `
  input ProjectCreateInput {
    ${createFields(Project, OMIT)}
  }
`

const ProjectUpdateInput = /* GraphQL */ `
  input ProjectUpdateInput {
    ${updateFields(Project, OMIT)}
  }
`

const ProjectWhereInput = /* GraphQL */ `
  input ProjectWhereInput {
    ${whereFields(Project, OMIT)}
  }
`

const Query = /* GraphQL */ `
  type Query {
    project(id: ID!): Project
    projects(where: ProjectWhereInput!, ${paginationArgs}): [Project!]!
  }
`

const Mutation = /* GraphQL */ `
  type Mutation {
    createProject(data: ProjectCreateInput!): Project!
    updateProject(id: ID!, data: ProjectUpdateInput!): Project!
    deleteProject(id: ID!, data: ProjectUpdateInput!): Project!
  }
`

export const projectTypeDefs = [
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
  ProjectWhereInput,
  Query,
  Mutation,
].join('\n')

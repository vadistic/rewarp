import { EntityMetadata } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'
import {
  columnTypeToGraphQLDataType,
  columnToTypeScriptType,
  uniquesForEntity,
  columnToTypes,
} from './typeorm-converter'
import { GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql'
import { GraphQLISODateTime } from 'type-graphql'

const CREATE_UPDATE_BLACKLIST = [
  'createdAt',
  'createdById',
  'updatedAt',
  'updatedById',
  'deletedAt',
  'deletedById',
]

// WHERE UNIQUE

export const entityToWhereUniqueInput = (entity: EntityMetadata): string => {
  const uniques = uniquesForEntity(entity)

  const numUniques = entity.columns.reduce<number>((num, column: ColumnMetadata) => {
    if (uniques.includes(column.propertyName) || column.isPrimary) {
      num++
    }

    return num
  }, 0)

  // If there is only one unique field, it should not be nullable
  const uniqueFieldsAreNullable = numUniques > 1

  let fieldsTemplate = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    if (uniques.includes(column.propertyName) || column.isPrimary) {
      const nullable = uniqueFieldsAreNullable ? ', { nullable: true }' : ''
      const graphQLDataType = columnTypeToGraphQLDataType(column)
      const tsType = columnToTypeScriptType(column)

      fieldsTemplate += `
        @Field(() => ${graphQLDataType}${nullable})
        ${column.propertyName}?: ${tsType};
      `
    }
  })

  const template = `
    @InputType()
    export class ${entity.name}WhereUniqueInput {
      ${fieldsTemplate}
    }
  `

  return template
}

// WHERE

export const entityToWhereInput = (entity: EntityMetadata): string => {
  let fieldTemplates = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    // Don't allow filtering on these fields
    if (
      column.isPrimary ||
      column.isVersion ||
      CREATE_UPDATE_BLACKLIST.includes(column.propertyName)
    ) {
      return
    }

    const { graphqlType, tsType } = columnToTypes(column)

    const graphQLDataType = columnTypeToGraphQLDataType(column)

    // TODO: for foreign key fields, only allow the same filters as ID below
    // Example: photo.userId: String
    if (column.isPrimary || graphqlType === GraphQLID) {
      fieldTemplates += `
        @Field(() => ${graphQLDataType},{ nullable: true })
        ${column.propertyName}_eq?: string;
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: string[];
      `
    } else if (graphqlType === GraphQLString) {
      // TODO: do we need NOT?
      // `${column.propertyName}_not`
      fieldTemplates += `
        @Field({ nullable: true })
        ${column.propertyName}_eq?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_contains?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_startsWith?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_endsWith?: ${tsType};
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: ${tsType}[];
      `
    } else if (graphqlType === GraphQLFloat || graphqlType === GraphQLInt) {
      fieldTemplates += `
        @Field({ nullable: true })
        ${column.propertyName}_eq?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_gt?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_gte?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_lt?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_lte?: ${tsType};
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: ${tsType}[];
      `
    } else if (graphqlType === GraphQLISODateTime) {
      fieldTemplates += `
        @Field({ nullable: true })
        ${column.propertyName}_gt?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_gte?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_lt?: ${tsType};
        @Field({ nullable: true })
        ${column.propertyName}_lte?: ${tsType};
      `
    } else if (
      column.type !== 'json' &&
      column.type !== 'jsonb' &&
      column.type !== 'varying character'
    ) {
      // @@@ dcaddigan not sure what it means to search by JSONObjects
      // future release?

      // Enums will fall through here
      fieldTemplates += `
        @Field(() => ${graphQLDataType}, { nullable: true })
        ${column.propertyName}_eq?: ${graphQLDataType};
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: ${graphQLDataType}[];
      `
    }
  })

  return `
    @InputType()
    export class ${entity.name}WhereInput extends BaseWhereInput {
      ${fieldTemplates}
    }
  `
}

// CREATE

export const entityToCreateInput = (entity: EntityMetadata): string => {
  let fieldTemplates = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    if (
      !column.isPrimary &&
      !column.isCreateDate &&
      !column.isGenerated &&
      !column.isUpdateDate &&
      !column.isVersion &&
      !CREATE_UPDATE_BLACKLIST.includes(column.propertyName)
    ) {
      const graphQLDataType = columnTypeToGraphQLDataType(column)
      const nullable = column.isNullable ? '{ nullable: true }' : ''
      const tsRequired = column.isNullable ? '?' : '!'
      const tsType = columnToTypeScriptType(column)

      // we need to know what the graphql type is and what the tsType is
      // for enums

      if (
        column.enum ||
        column.type === 'json' ||
        column.type === 'jsonb' ||
        column.type === 'varying character'
      ) {
        fieldTemplates += `
          @Field(() => ${graphQLDataType}, ${nullable})
          ${column.propertyName}${tsRequired}: ${tsType};
       `
      } else {
        fieldTemplates += `
          @Field(${nullable})
          ${column.propertyName}${tsRequired}: ${tsType};
        `
      }
    }
  })

  return `
    @InputType()
    export class ${entity.name}CreateInput {
      ${fieldTemplates}
    }
  `
}

// UPDATE

export const entityToUpdateInput = (entity: EntityMetadata): string => {
  let fieldTemplates = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    if (
      !column.isPrimary &&
      !column.isCreateDate &&
      !column.isGenerated &&
      !column.isUpdateDate &&
      !column.isVersion &&
      !CREATE_UPDATE_BLACKLIST.includes(column.propertyName)
    ) {
      // TODO: also don't allow updated foreign key fields
      // Example: photo.userId: String
      const graphQLDataType = columnTypeToGraphQLDataType(column)
      const tsType = columnToTypeScriptType(column)

      if (
        column.enum ||
        column.type === 'json' ||
        column.type === 'jsonb' ||
        column.type === 'varying character'
      ) {
        fieldTemplates += `
        @Field(() => ${graphQLDataType}, { nullable: true })
        ${column.propertyName}?: ${tsType};
      `
      } else {
        fieldTemplates += `
        @Field({ nullable: true })
        ${column.propertyName}?: ${tsType};
      `
      }
    }
  })

  return `
    @InputType()
    export class ${entity.name}UpdateInput {
      ${fieldTemplates}
    }
  `
}

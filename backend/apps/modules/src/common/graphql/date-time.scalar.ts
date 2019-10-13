import { ASTNode, GraphQLScalarType, Kind } from 'graphql'

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: `ISO DateTiem String`,
  serialize(value: string) {
    return new Date(value)
  },
  parseValue(value: Date) {
    return value.toISOString()
  },
  parseLiteral(ast: ASTNode) {
    // maybe delet dis
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }

    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }

    return null
  },
})

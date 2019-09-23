import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, ASTNode } from 'graphql'

@Scalar('Date', of => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Custom scalar date type (ISO8601 string)'

  parseValue(value: string): Date {
    return new Date(value) // value from the client
  }

  serialize(value: Date): string {
    return value.toISOString() // value sent to the client
  }

  parseLiteral(ast: ASTNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }

    throw Error(`AST value ${ast} is not a string.`)
  }
}

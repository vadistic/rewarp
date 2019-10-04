import { DefaultNamingStrategy } from 'typeorm'

export class CustomNamingStrategy extends DefaultNamingStrategy {
  name = 'Custom'

  tableName(targetName: string, userSpecifiedName?: string): string {
    return userSpecifiedName || targetName.replace(/entity/gi, '')
  }
}

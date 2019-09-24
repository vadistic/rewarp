import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { DefaultNamingStrategy } from 'typeorm'

import { CommonModule } from './modules/common/common.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { ProjectModule } from './modules/project/project.module'
import { WorkspaceModule } from './modules/workspace/workspace.module'
import { CONFIG } from './config'

class CustomNamingStrategy extends DefaultNamingStrategy {
  name = 'Custom'

  tableName(targetName: string, userSpecifiedName?: string): string {
    console.log(targetName, userSpecifiedName)

    return userSpecifiedName || targetName.replace(/entity/gi, '')
  }
}

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT,
  username: CONFIG.DB_USERNAME,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  schema: CONFIG.DB_SCHEMA,
  // .js needed to work after compilation...
  entities: [join(__dirname, '**/**.entity.{ts,js}')],
  synchronize: false,
  logging: 'all',
  // ssl needed for heroku
  ssl: true,
  namingStrategy: new CustomNamingStrategy(),
}

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    ProjectModule,
    WorkspaceModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.graphql',
    }),
  ],
})
export class AppModule {}

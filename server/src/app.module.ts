import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from './common/auth/auth.module'
import { LoggerModule } from './common/logger/logger.module'
import { CONFIG } from './config'
import { CustomNamingStrategy } from './utils/naming-strategy'
import { UserModule } from './feature/user/user.module'
import { ProjectModule } from './feature/project/project.module'
import { WorkspaceModule } from './feature/workspace/workspace.module'
import { SharedModule } from './common/shared/shared.module'

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT,
  username: CONFIG.DB_USERNAME,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  schema: CONFIG.DB_SCHEMA,
  // .js needed to work after compilation...
  entities: [join(__dirname, 'entities/*.entity.{ts,js}')],
  synchronize: false,
  logging: CONFIG.LOG_LEVEL_TORM,
  logger: CONFIG.LOG_TYPE_TORM,
  // ssl needed for heroku
  ssl: true,
  namingStrategy: new CustomNamingStrategy(),
}

@Module({
  imports: [
    SharedModule,
    LoggerModule,
    AuthModule,
    UserModule,
    ProjectModule,
    WorkspaceModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.graphql',
      path: '/',
    }),
  ],
})
export class AppModule {}

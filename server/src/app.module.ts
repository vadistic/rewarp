import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { UserModule } from './user/user.module'
import { CommonModule } from './common/common.module'
import { ProjectModule } from './project/project.module'
import { AuthModule } from './auth/auth.module'

const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? +process.env.PGPORT : 5432,
  username: process.env.PGUSER || 'root',
  password: process.env.PGPASSWORD || 'root',
  database: process.env.PGDATABASE || 'test',
  schema: process.env.PGSCHEMA || 'public',
  // .js needed to work after compilation...
  entities: [join(__dirname, '**/**.entity.{ts,js}')],
  synchronize: true,
  logging: 'all',
  // ssl needed for heroku
  ssl: true,
}

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    ProjectModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.graphql',
    }),
  ],
})
export class AppModule {}

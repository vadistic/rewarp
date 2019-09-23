import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { RecipesModule } from './recipes/recipes.module'
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { UserModule } from './user/user.module'

const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? +process.env.PGPORT : 5432,
  username: process.env.PGUSER || 'root',
  password: process.env.PGPASSWORD || 'root',
  database: process.env.PGDATABASE || 'test',
  schema: process.env.PGSCHEMA || 'public',
  // js needed to work after compilation...
  entities: [join(__dirname, '**/**.entity.{ts,js}')],
  synchronize: true,
  logging: 'all',
  // ssl needed for heroku
  ssl: true,
}

console.log(typeOrmOptions)

@Module({
  imports: [
    RecipesModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.graphql',
    }),
  ],
})
export class AppModule {}

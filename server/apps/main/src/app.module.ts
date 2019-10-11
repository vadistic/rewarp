import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { printSchema } from 'graphql'
import { DatabaseModule, DATABASE_MODULE_CONFIG } from '../../../libs/database/src'
import { graphqlTypeDefs, graphqlResolvers } from './common/graphql'
import { projectTypeDefs } from './feature/project'
import { userTypeDefs } from './feature/user'
import { ConfigModule } from './common/config'
import { UserModule } from './feature/user/user.module'
import { ProjectModule } from './feature/project/project.module'

// eslint-disable-next-line
import {mergeSchemas} from 'graphql-tools'

export const appTypedefs = [graphqlTypeDefs, userTypeDefs, projectTypeDefs]

const schema = mergeSchemas({ schemas: appTypedefs })

const typeDefs = printSchema(schema)

@Module({
  imports: [
    UserModule,
    ProjectModule,
    GraphQLModule.forRootAsync({
      useFactory() {
        if (process.env.NODE_ENV === 'production') {
          return {
            debug: false,
            playground: true,
            introspection: true,
            path: '/',
            typeDefs: typeDefs,
            resolvers: graphqlResolvers,
            resolverValidationOptions: {
              requireResolversForResolveType: false,
            },
          }
        } else {
          return {
            debug: true,
            playground: true,
            introspection: true,
            path: '/',
            typeDefs: typeDefs,
            resolvers: graphqlResolvers,
            definitions: {
              path: join(process.cwd(), 'apps/main/src/generated/typegen.ts'),
              outputAs: 'class',
            },
            resolverValidationOptions: {
              requireResolversForResolveType: false,
            },
          }
        }
      },
    }),
    DatabaseModule.forRoot(DATABASE_MODULE_CONFIG),
    ConfigModule.forRoot({}),
  ],
  exports: [DatabaseModule],
})
export class AppModule {}

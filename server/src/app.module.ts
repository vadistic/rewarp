import { Module } from '@nestjs/common'
import { AuthModule } from './common/auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ProjectModule } from './feature/project/project.module'
import { UserModule } from './feature/user/user.module'
import { WorkspaceModule } from './feature/workspace/workspace.module'
import { GraphqlModule } from './graphql/graphql.module'

@Module({
  imports: [AuthModule, UserModule, ProjectModule, WorkspaceModule, GraphqlModule, DatabaseModule],
})
export class AppModule {}

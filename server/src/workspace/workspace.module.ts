import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkspaceService } from './workspace.service'
import { Workspace } from './workspace.entity'
import { WorkspaceResolver } from './workspace.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  providers: [WorkspaceResolver, WorkspaceService],
})
export class WorkspaceModule {}

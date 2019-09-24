import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WorkspaceService } from './workspace.service'
import { WorkspaceEntity } from './workspace.entity'
import { WorkspaceResolver } from './workspace.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
  providers: [WorkspaceResolver, WorkspaceService],
})
export class WorkspaceModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkspaceService } from './workspace.service'
import { WorkspaceResolver } from './workspace.resolver'
import { WorkspaceEntity } from '../../entities/workspace.entity'

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
  providers: [WorkspaceResolver, WorkspaceService],
})
export class WorkspaceModule {}

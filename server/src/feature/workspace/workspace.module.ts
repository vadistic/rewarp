import { Module } from '@nestjs/common'
import { LoggerService } from '../../common/logger/logger.service'
import { LoadersModule } from '../../database/loader/loaders.module'
import { RepositoriesModule } from '../../database/repository/repositories.module'
import { WorkspaceResolver } from './workspace.resolver'
import { WorkspaceService } from './workspace.service'

@Module({
  imports: [RepositoriesModule, LoadersModule],
  providers: [
    WorkspaceResolver,
    WorkspaceService,
    {
      provide: LoggerService,
      useValue: new LoggerService(WorkspaceModule.name),
    },
  ],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}

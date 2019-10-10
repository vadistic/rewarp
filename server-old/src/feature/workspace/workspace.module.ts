import { Module } from '@nestjs/common'
import { LoggerService } from '../../common/logger/logger.service'
import { LoadersModule } from '../../database/loader/loaders.module'
import { RepositoriesModule } from '../../database/repositories/repositories.module'
import { WorkspaceResolver } from './workspace.resolver'

@Module({
  imports: [RepositoriesModule, LoadersModule],
  providers: [
    WorkspaceResolver,
    {
      provide: LoggerService,
      useValue: new LoggerService(WorkspaceModule.name),
    },
  ],
})
export class WorkspaceModule {}

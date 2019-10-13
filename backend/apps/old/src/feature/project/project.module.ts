import { Module } from '@nestjs/common'
import { LoggerService } from '../../common/logger/logger.service'
import { LoadersModule } from '../../database/loader/loaders.module'
import { RepositoriesModule } from '../../database/repositories/repositories.module'
import { ProjectResolver } from './project.resolver'

@Module({
  imports: [RepositoriesModule, LoadersModule],
  providers: [
    ProjectResolver,
    {
      provide: LoggerService,
      useValue: new LoggerService(ProjectModule.name),
    },
  ],
})
export class ProjectModule {}

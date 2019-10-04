import { Module } from '@nestjs/common'
import { loggerProvider } from '../../common/logger/logger.service'
import { RepositoriesModule } from '../../database/repository/repositories.module'
import { ProjectResolver } from './project.resolver'
import { ProjectService } from './project.service'

@Module({
  imports: [RepositoriesModule],
  providers: [ProjectResolver, ProjectService, loggerProvider(ProjectModule.name)],
  exports: [ProjectService],
})
export class ProjectModule {}

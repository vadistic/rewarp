import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectService } from './project.service'
import { ProjectResolver } from './project.resolver'
import { ProjectEntity } from '../../entities/project.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}

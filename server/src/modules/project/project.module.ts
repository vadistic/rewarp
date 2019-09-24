import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectService } from './project.service'
import { ProjectEntity } from './project.entity'
import { ProjectResolver } from './project.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}

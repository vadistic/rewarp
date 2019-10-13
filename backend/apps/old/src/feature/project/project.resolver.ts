import { UseInterceptors } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GraphqlLoggerInterceptor } from '../../common/logger/graphql-logger.interceptor'
import { LoadersService } from '../../database/loader/loaders.service'
import { RepositoriesService } from '../../database/repositories/repositories.service'
import { mapFindConditions } from '../../database'
import { ProjectWhereInput, ProjectWhereUniqueInput } from './project.dto'
import { ProjectModel } from './project.model'

@Resolver(ProjectModel)
@UseInterceptors(GraphqlLoggerInterceptor)
export class ProjectResolver {
  constructor(private readonly repos: RepositoriesService, private readonly loaders: LoadersService) {}

  @Query(returns => ProjectModel)
  async project(
    @Args('where')
    where: ProjectWhereUniqueInput,
  ) {
    const res = await this.repos.project.findOne({ where })

    return res
  }

  @Query(returns => [ProjectModel])
  async projects(
    @Args({ name: 'where', type: () => ProjectWhereInput, nullable: true })
    where?: ProjectWhereInput,
  ) {
    return this.repos.project.find({ where: mapFindConditions(where) })
  }
}

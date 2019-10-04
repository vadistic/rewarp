import { UseInterceptors } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GraphqlLoggerInterceptor } from '../../common/logger/graphql-logger.interceptor'
import { LoadersService } from '../../database/loader/loaders.service'
import { RepositoriesService } from '../../database/repositories/repositories.service'
import { mapWhere } from '../../database/utils/search-operator'
import { ProjectWhereInput, ProjectWhereUniqueInput } from './project.dto'
import { Project } from './project.model'

@Resolver(Project)
@UseInterceptors(GraphqlLoggerInterceptor)
export class ProjectResolver {
  constructor(
    private readonly repos: RepositoriesService,
    private readonly loaders: LoadersService,
  ) {}

  @Query(returns => Project)
  async project(
    @Args('where')
    where: ProjectWhereUniqueInput,
  ) {
    const res = await this.repos.project.findOne({ where })

    return res
  }

  @Query(returns => [Project])
  async projects(
    @Args({ name: 'where', type: () => [ProjectWhereInput], nullable: true })
    where?: ProjectWhereInput[],
  ): Promise<Project[]> {
    return this.repos.project.find({ where: mapWhere(where) })
  }
}

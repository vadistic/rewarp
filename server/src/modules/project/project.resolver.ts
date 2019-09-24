import { Resolver, Query, Args } from '@nestjs/graphql'
import { ProjectService } from './project.service'
import { ProjectWhereUniqueInput } from './project.dto'
import { Project } from './project.model'

@Resolver(Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(returns => Project)
  async project(@Args('where') where: ProjectWhereUniqueInput): Promise<Project | null> {
    return (await this.projectService.findOne(where)) || null
  }

  @Query(returns => [Project])
  async projects(): Promise<Project[]> {
    return this.projectService.findAll()
  }
}

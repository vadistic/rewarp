import { Resolver, Query, Args } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common'
import { Project } from './project.entity'
import { ProjectService } from './project.service'

@Resolver((of: void) => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(returns => Project)
  async project(@Args('id') id: string): Promise<Project | null> {
    const user = await this.projectService.findOne(id)

    if (!user) {
      throw new NotFoundException(id)
    }

    return user
  }

  @Query(returns => [Project])
  async projects(): Promise<Project[]> {
    return this.projectService.findAll()
  }
}

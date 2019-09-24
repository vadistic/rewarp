import { Resolver, Query, Args } from '@nestjs/graphql'

import { WorkspaceService } from './workspace.service'
import { Workspace } from './workspace.model'
import { WorkspaceWhereUniqueInput } from './workspace.dto'

@Resolver(Workspace)
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query(returns => Workspace)
  async workspace(@Args('where') where: WorkspaceWhereUniqueInput): Promise<Workspace | null> {
    return (await this.workspaceService.findOne(where)) || null
  }

  @Query(returns => [Workspace])
  async workspaces(): Promise<Workspace[]> {
    return this.workspaceService.findMany()
  }
}

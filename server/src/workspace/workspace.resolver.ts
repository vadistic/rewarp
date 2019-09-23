import { Resolver, Query, Args } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common'
import { Workspace } from './workspace.entity'
import { WorkspaceService } from './workspace.service'

@Resolver(() => Workspace)
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query(returns => Workspace)
  async workspace(@Args('id') id: string): Promise<Workspace | null> {
    const user = await this.workspaceService.read(id)

    if (!user) {
      throw new NotFoundException(id)
    }

    return user
  }

  @Query(returns => [Workspace])
  async workspaces(): Promise<Workspace[]> {
    return this.workspaceService.readMany()
  }
}

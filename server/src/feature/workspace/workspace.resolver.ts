import { UseGuards, UseInterceptors } from '@nestjs/common'
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql'
import { LoggerService } from '../../common/logger/logger.service'
import { WorkspaceEntity } from '../../database/entities/workspace.entity'
import { LoadersService } from '../../database/loader/loaders.service'
import { RepositoriesService } from '../../database/repository/repositories.service'
import { UserPublicModel } from '../user/user.model'
import { RolesGuard } from './roles.guard'
import { RolesInterceptor } from './roles.interceptor'
import { WorkspaceWhereUniqueInput } from './workspace.dto'
import { WorkspaceModel } from './workspace.model'

@Resolver(() => WorkspaceModel)
export class WorkspaceResolver {
  constructor(
    private readonly repos: RepositoriesService,
    private readonly loaders: LoadersService,
    private readonly logger: LoggerService,
  ) {}

  @Query(returns => WorkspaceModel)
  async workspace(@Args('where') where: WorkspaceWhereUniqueInput) {
    const res = await this.repos.workspace.findOne({ where })

    this.logger.verbose(res)

    return res
  }

  @Query(returns => [WorkspaceModel])
  async workspaces() {
    const userId = `e9778b5a-1a47-4563-9aca-7043d90d9f76`

    const res = await this.repos.workspace
      .createQueryBuilder('workspace')
      .leftJoinAndSelect('workspace.usersXref', 'usersXref')
      .leftJoinAndSelect('usersXref.user', 'user')
      .where(`user.id = :id`, { id: userId })
      .getMany()
    // .innerJoinAndSelect('usersXref.user', 'user')

    this.logger.verbose(res)

    return res
  }

  @ResolveProperty('users', returns => [UserPublicModel])
  @UseGuards(RolesGuard)
  @UseInterceptors(RolesInterceptor)
  async users(@Parent() workspace: WorkspaceEntity) {
    const res = workspace.usersXref.map(xref => xref.user)

    return res
  }
}

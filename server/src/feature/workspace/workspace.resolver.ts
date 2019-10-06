import { UseInterceptors } from '@nestjs/common'
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql'
import { GraphqlLoggerInterceptor } from '../../common/logger/graphql-logger.interceptor'
import { WorkspaceEntity } from '../../database/entities/workspace.entity'
import { LoadersService } from '../../database/loader/loaders.service'
import { RepositoriesService } from '../../database/repositories/repositories.service'
import { WorkspaceWhereUniqueInput } from './workspace.dto'
import { WorkspaceModel } from './workspace.model'

@Resolver(WorkspaceModel)
@UseInterceptors(GraphqlLoggerInterceptor)
export class WorkspaceResolver {
  constructor(
    private readonly repos: RepositoriesService,
    private readonly loaders: LoadersService,
  ) {}

  @Query(returns => WorkspaceModel)
  async workspace(@Args('where') where: WorkspaceWhereUniqueInput) {
    const userId = `e9778b5a-1a47-4563-9aca-7043d90d9f76`

    const res = await this.repos.workspace
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.usersXref', 'usersXref')
      .leftJoinAndSelect('usersXref.user', 'user')
      .where(`user.id = :id`, { id: userId })
      .andWhere('workspace.id = :id', { id: where.id })

    return res
  }

  @Query(returns => [WorkspaceModel])
  async workspaces() {
    const userId = `e9778b5a-1a47-4563-9aca-7043d90d9f76`

    const res = await this.repos.workspace
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.usersXref', 'usersXref')
      .leftJoinAndSelect('usersXref.user', 'user')
      .where('user.id = :id', { id: userId })
      .getMany()

    return res
  }

  @ResolveProperty()
  async users(@Parent() parent: WorkspaceEntity) {
    return parent.usersXref.map(xref => xref.user)
  }
}

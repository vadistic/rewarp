import { UseInterceptors } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GraphqlLoggerInterceptor } from '../../common/logger/graphql-logger.interceptor'
import { LoadersService } from '../../database/loader/loaders.service'
import { RepositoriesService } from '../../database/repositories/repositories.service'
import { mapWhere } from '../../database/utils/search-operator'
import { UserWhereInput, UserWhereUniqueInput } from './user.dto'
import { UserPublicModel } from './user.model'

@Resolver(UserPublicModel)
@UseInterceptors(GraphqlLoggerInterceptor)
export class UserPublicResolver {
  constructor(
    private readonly repos: RepositoriesService,
    private readonly loaders: LoadersService,
  ) {}

  @Query(returns => UserPublicModel, { nullable: true })
  async user(
    @Args('where')
    where: UserWhereUniqueInput,
  ) {
    const res = where.id
      ? this.loaders.user.load(where.id)
      : this.repos.user.findOne({ where, loadRelationIds: true })

    return res
  }

  @Query(returns => [UserPublicModel])
  async users(
    @Args({ name: 'where', type: () => UserWhereInput, nullable: true })
    where?: UserWhereInput,
  ) {
    const res = await this.repos.user.find({
      where: mapWhere(where),
      loadRelationIds: true,
    })

    return res
  }
}

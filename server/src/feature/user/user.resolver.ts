import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserWhereUniqueInput, UserWhereInput } from './user.dto'
import { UserModel } from './user.model'

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UserModel, { nullable: true })
  async user(
    @Args({ name: 'where', type: () => UserWhereUniqueInput })
    where: UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    return (await this.userService.findOne(where)) || null
  }

  @Query(returns => [UserModel])
  async users(
    @Args({ name: 'where', type: () => [UserWhereInput], nullable: true })
    where?: UserWhereInput[],
  ): Promise<UserModel[]> {
    return this.userService.findMany(where)
  }
}

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserWhereUniqueInput, UserCreateInput } from './user.dto'
import { User } from './user.model'

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, { nullable: true })
  async user(@Args('where') where: UserWhereUniqueInput): Promise<User | null> {
    return (await this.userService.findOne(where)) || null
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Mutation(returns => User)
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    return this.userService.create(data)
  }
}

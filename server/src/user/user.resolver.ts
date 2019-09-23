import { Resolver, Query, Args } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { WhereUniqueInputArgs } from '../common/base/where.input'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async user(@Args()
  {
    where: { id },
  }: WhereUniqueInputArgs): Promise<User | null> {
    const user = await this.userService.findById(id)

    if (!user) {
      throw new NotFoundException(id)
    }

    return user
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll()
  }
}

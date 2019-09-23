import { Resolver, Query, Args } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common'
import { User } from './user.model'
import { UserService } from './user.service'
import { ID } from '../common/base/base.types'

@Resolver((of: void) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async user(@Args('id') id: ID): Promise<User | null> {
    const user = await this.userService.findOne(id)

    if (!user) {
      throw new NotFoundException(id)
    }

    return user
  }

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userService.findAll()
  }
}

import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'
import { AuthPayload } from './auth.model'
import { AuthService } from './auth.service'
import { UseGuards } from '@nestjs/common'
import { GraphqlAuthGuard } from './auth.guard'
import { Current } from '../common/current.decorator'

@Resolver(AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => AuthPayload)
  async login(
    @Args('email')
    email: string,
    @Args('password')
    password: string,
  ): Promise<AuthPayload> {
    return this.authService.login(email, password)
  }

  @Mutation(returns => AuthPayload)
  async refresh(
    @Args('token')
    token: string,
  ): Promise<AuthPayload> {
    return this.authService.refresh(token)
  }

  // DELET DIS

  @Query(returns => String)
  @UseGuards(GraphqlAuthGuard)
  async privateString(@Current() user: any) {
    console.log(`CurrentuserDecorator`, user)
    return 'My secret string'
  }

  @Query(returns => String)
  async publicString() {
    return 'My public string'
  }
}

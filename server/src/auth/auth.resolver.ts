import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { LoggerService } from '../common/logger/logger.service'
import { GraphqlAuthGuard } from './auth.guard'
import { AuthPayload } from './auth.model'
import { AuthService } from './auth.service'

@Resolver(AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly log: LoggerService) {}

  @Mutation(returns => AuthPayload)
  async login(
    @Args('email')
    email: string,
    @Args('password')
    password: string,
  ): Promise<AuthPayload> {
    this.log.verbose(`mutation login (email: ${email})`)

    return this.authService.login(email, password)
  }

  @Mutation(returns => AuthPayload)
  async refresh(
    @Args('token')
    token: string,
  ): Promise<AuthPayload> {
    this.log.verbose(`mutation refresh (token: ${token})`)

    return this.authService.refresh(token)
  }

  // DELET DIS

  @Query(returns => String)
  @UseGuards(GraphqlAuthGuard)
  async privateString() {
    this.log.verbose(`mutation privateString`)

    return 'My secret string'
  }

  @Query(returns => String)
  async publicString() {
    this.log.verbose(`mutation publicString`)

    return 'My public string'
  }
}

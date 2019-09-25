import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'
import { AuthPayload } from './auth.model'
import { AuthService } from './auth.service'
import { UseGuards } from '@nestjs/common'
import { GraphqlAuthGuard } from './auth.guard'
import { LoggerService } from '../logger/logger.service'

@Resolver(AuthPayload)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {}

  logger = (msg: string) => this.loggerService.verbose(msg, AuthResolver.name)

  @Mutation(returns => AuthPayload)
  async login(
    @Args('email')
    email: string,
    @Args('password')
    password: string,
  ): Promise<AuthPayload> {
    this.logger(`mutation login (email: ${email})`)

    return this.authService.login(email, password)
  }

  @Mutation(returns => AuthPayload)
  async refresh(
    @Args('token')
    token: string,
  ): Promise<AuthPayload> {
    this.logger(`mutation refresh (token: ${token})`)

    return this.authService.refresh(token)
  }

  // DELET DIS

  @Query(returns => String)
  @UseGuards(GraphqlAuthGuard)
  async privateString() {
    this.logger(`mutation privateString`)

    return 'My secret string'
  }

  @Query(returns => String)
  async publicString() {
    this.logger(`mutation publicString`)

    return 'My public string'
  }
}

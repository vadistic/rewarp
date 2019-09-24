import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../user/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    })
  }

  // ! this fn interface is set in stone by @nestjs/passport
  async validate(email: string, password: string): Promise<User> {
    console.log('local strategy validate() called')
    const user = await this.authService.validateLocal(email, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}

import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/user.entity'
import { AuthPayload } from './auth.model'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email)

    if (user && user.password === password) {
      return user
    }

    return null
  }

  // guessing it's called with validate payload ??
  async login(user: User): Promise<AuthPayload> {
    const payload = { email: user.email, sub: user.id }

    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    }
  }
}

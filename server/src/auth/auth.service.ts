import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { AuthArgs } from './auth.dto'
import { User } from '../user/user.entity'
import { AuthPayload } from './auth.model'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(args: AuthArgs): Promise<User | null> {
    const user = await this.userService.findByEmail(args.email)

    if (user && user.password === args.password) return user

    return null
  }

  //  ADD TENANT ID & create interface
  async login(user: User): Promise<AuthPayload> {
    const payload = { sub: user.id, email: user.email }
    return {
      token: this.jwtService.sign(payload),
    }
  }
}

import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '../user/user.module'
import { CONSTANTS } from '../constants'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secretOrPrivateKey: CONSTANTS.JWT_SECRET,
      signOptions: {
        expiresIn: CONSTANTS.JWT_EXPIRE,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { CONFIG } from '../../config/config'
import { UserModule } from '../../feature/user/user.module'
import { loggerProvider } from '../logger/logger.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: CONFIG.JWT_SECRET,
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, loggerProvider(AuthModule.name)],
  exports: [AuthService],
})
export class AuthModule {}

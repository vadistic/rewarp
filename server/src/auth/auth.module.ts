import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { LoggerService } from '../common/logger/logger.service'
import { CONFIG } from '../config/config'
import { RepositoriesModule } from '../database/repositories/repositories.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    RepositoriesModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: CONFIG.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    {
      provide: LoggerService,
      useValue: new LoggerService(AuthModule.name),
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'

// https://docs.nestjs.com/techniques/authentication

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'VERY_HARD_SECRET',
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [UserService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}

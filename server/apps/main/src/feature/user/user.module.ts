import { Module } from '@nestjs/common'
import { LoggerService } from '../../../../../libs/logger/src'
import { UserResolver } from './user.resolver'

@Module({
  providers: [
    UserResolver,
    {
      provide: LoggerService,
      useValue: new LoggerService(UserModule.name),
    },
  ],
})
export class UserModule {}

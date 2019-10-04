import { Module } from '@nestjs/common'
import { LoggerService } from '../../common/logger/logger.service'
import { LoadersModule } from '../../database/loader/loaders.module'
import { RepositoriesModule } from '../../database/repository/repositories.module'
import { UserPublicResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [RepositoriesModule, LoadersModule],
  providers: [
    UserPublicResolver,
    UserService,
    {
      provide: LoggerService,
      useValue: new LoggerService(UserModule.name),
    },
  ],
  exports: [UserService],
})
export class UserModule {}

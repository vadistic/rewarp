import { Module } from '@nestjs/common'
import { LoggerService } from '../../common/logger/logger.service'
import { LoadersModule } from '../../database/loader/loaders.module'
import { RepositoriesModule } from '../../database/repositories/repositories.module'
import { UserPublicResolver } from './user.resolver'

@Module({
  imports: [RepositoriesModule, LoadersModule],
  providers: [
    UserPublicResolver,
    {
      provide: LoggerService,
      useValue: new LoggerService(UserModule.name),
    },
  ],
})
export class UserModule {}

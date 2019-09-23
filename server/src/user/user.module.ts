import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DateScalar } from '../common/scalars/date.scalar'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { User } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, DateScalar],
})
export class UserModule {}

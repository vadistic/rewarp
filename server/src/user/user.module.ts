import { Module } from '@nestjs/common'
import { DateScalar } from '../common/scalars/date.scalar'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, DateScalar],
})
export class UserModule {}

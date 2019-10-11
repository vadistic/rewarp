import { Resolver, Query } from '@nestjs/graphql'
import { UseInterceptors } from '@nestjs/common'
import { GraphqlLoggerInterceptor } from '@app/logger'
import { DatabaseService } from '@app/database'

@Resolver('User')
@UseInterceptors(GraphqlLoggerInterceptor)
export class UserResolver {
  constructor(readonly db: DatabaseService) {}

  @Query()
  user() {
    return this.db.user.repo.findOne()
  }

  @Query()
  users() {
    console.log('A')
    return this.db.user.repo.find()
  }
}

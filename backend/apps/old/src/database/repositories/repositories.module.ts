import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ENTITIES } from '@libs/database'
import { RepositoriesService } from './repositories.service'

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [RepositoriesService],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}

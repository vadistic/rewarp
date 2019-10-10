import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseEntities } from '../database.config'
import { RepositoriesService } from './repositories.service'

@Module({
  imports: [TypeOrmModule.forFeature(databaseEntities)],
  providers: [RepositoriesService],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}

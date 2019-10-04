import { Module } from '@nestjs/common'
import { databaseEntities } from '../database.config'
import { LoaderModule } from './loader.module'
import { LoadersService } from './loaders.service'

@Module({
  imports: [LoaderModule.forFeature(databaseEntities)],
  providers: [LoadersService],
  exports: [LoadersService],
})
export class LoadersModule {}

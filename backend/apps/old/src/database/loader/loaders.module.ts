import { Module } from '@nestjs/common'
import { ENTITIES } from '@libs/database'
import { LoaderModule } from './loader.module'
import { LoadersService } from './loaders.service'

@Module({
  imports: [LoaderModule.forFeature(ENTITIES)],
  providers: [LoadersService],
  exports: [LoadersService],
})
export class LoadersModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CONNECTION_OPTIONS } from '@libs/database'

@Module({
  imports: [TypeOrmModule.forRoot(CONNECTION_OPTIONS)],
})
export class DatabaseModule {}

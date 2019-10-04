import { Module } from '@nestjs/common'
import { loggerProvider, LoggerService } from './logger.service'

@Module({
  providers: [loggerProvider('Global')],
  exports: [LoggerService],
})
export class LoggerModule {}

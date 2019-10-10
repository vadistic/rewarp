import { Module } from '@nestjs/common'
import { LoggerService } from './logger.service'

@Module({
  providers: [
    {
      provide: LoggerService,
      useValue: new LoggerService('Global'),
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}

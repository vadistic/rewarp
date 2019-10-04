import { Injectable, Logger as NestLogger, Provider } from '@nestjs/common'
import { appendFile } from 'fs'

const LOG_FILE_INFO = `combined.log`
const LOG_FILE_ERROR = `error.log`

@Injectable()
export class LoggerService extends NestLogger {
  private ctx!: string

  constructor(context: string) {
    super(context)
    this.ctx = context
  }

  log(message: any) {
    super.log(message, this.ctx)
    this.appendInfoLog(message)
  }

  error(message: any, trace?: string) {
    super.error(message, trace)
    this.appendErrLog(message, trace)
  }

  warn(message: any) {
    super.warn(message, this.ctx)
    this.appendInfoLog(message)
  }

  debug(message: any) {
    super.debug(message, this.ctx)
    this.appendInfoLog(message)
  }

  verbose(message: any) {
    super.verbose(message, this.ctx)
    this.appendInfoLog(message)
  }

  private appendInfoLog(message: string) {
    appendFile(LOG_FILE_INFO, this.formatLine(message), () => {})
  }

  private appendErrLog(message: string, trace?: string) {
    appendFile(LOG_FILE_ERROR, this.formatLine(message) + '\n' + trace + '\n', () => {})
  }

  private formatLine(message: string) {
    return `\n${new Date().toLocaleString()}  - [${this.ctx}] ${message}`
  }
}

export const loggerProvider = (context: string): Provider => ({
  provide: LoggerService,
  useValue: new LoggerService(context),
})

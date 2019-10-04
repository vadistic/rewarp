import { Injectable, Logger as NestLogger, LogLevel } from '@nestjs/common'
import { appendFile } from 'fs'

const LOG_FILE_DEBUG = `debug.log`
const LOG_FILE_COMBINED = `combined.log`
const LOG_FILE_ERROR = `error.log`

/**
 * LoggerService
 *
 * TODO:
 *  - use configurable log level
 */

@Injectable()
export class LoggerService extends NestLogger {
  private ctx!: string

  constructor(context: string) {
    super(context)
    this.ctx = context
  }

  log(message: any) {
    super.log('(l) ' + message, this.ctx)

    this.appendLog(message, 'log', [LOG_FILE_COMBINED])
  }

  error(message: any, trace?: string) {
    super.error('(e) ' + message, trace)

    this.appendLog(message + '\n\n' + trace, 'error', [LOG_FILE_COMBINED, LOG_FILE_ERROR])
  }

  warn(message: any) {
    super.warn('(w) ' + message, this.ctx)
    this.appendLog(message, 'warn', [LOG_FILE_COMBINED])
  }

  debug(message: any) {
    super.debug('(d) ' + message, this.ctx)
    this.appendLog(message, 'debug', [LOG_FILE_DEBUG])
  }

  verbose(message: any) {
    super.verbose('(v) ' + message, this.ctx)
    this.appendLog(message, 'verbose', [LOG_FILE_COMBINED])
  }

  private appendLog(message: any, level: LogLevel, files: string[]) {
    files.forEach(file => {
      appendFile(file, this.formatLine(message, level) + '\n', () => {})
    })
  }

  private formatLine(message: string, level: LogLevel) {
    return `[Nest]\t${new Date().toLocaleString()}\t[${this.ctx}](${level[0]})\t${message}`
  }
}

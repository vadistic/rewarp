import { Logger } from '@nestjs/common'
import { appendFile } from 'fs'

const LOG_FILE_INFO = `combined.log`
const LOG_FILE_ERROR = `error.log`

export class LoggerService extends Logger {
  appendInfoLog = (message: string, context: string) =>
    appendFile(LOG_FILE_INFO, this.formatLine(message, context), () => {})

  appendErrLog = (message: string, trace?: string, context?: string) =>
    appendFile(LOG_FILE_ERROR, this.formatLine(message, context) + '\n' + trace + '\n', () => {})

  formatLine = (message: string, context?: string) =>
    `\n${new Date().toLocaleString()}  - [${context}] ${message}`

  log(message: string, context: string) {
    super.log(message, context)
    this.appendInfoLog(message, context)
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace)
    this.appendErrLog(message, trace, context)
  }

  warn(message: string, context: string) {
    super.warn(message, context)
    this.appendInfoLog(message, context)
  }

  debug(message: string, context: string) {
    super.debug(message, context)
    this.appendInfoLog(message, context)
  }

  verbose(message: string, context: string) {
    super.verbose(message, context)
    this.appendInfoLog(message, context)
  }
}

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

  log = (context: string) => (message: string) => {
    super.log(message, context)
    this.appendInfoLog(message, context)
  }

  error = (context: string) => (message: string, trace?: string) => {
    super.error(message, trace)
    this.appendErrLog(message, trace, context)
  }

  warn = (context: string) => (message: string) => {
    super.warn(message, context)
    this.appendInfoLog(message, context)
  }

  debug = (context: string) => (message: string) => {
    super.debug(message, context)
    this.appendInfoLog(message, context)
  }

  verbose = (context: string) => (message: string) => {
    super.verbose(message, context)
    this.appendInfoLog(message, context)
  }
}

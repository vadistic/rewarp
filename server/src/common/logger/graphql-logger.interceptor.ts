import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { print } from 'graphql'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LoggerService } from './logger.service'

/**
 * GraphqlLoggerInterceptor
 *
 * TODO:
 *  - log user/workspace ids
 */
@Injectable()
export class GraphqlLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()

    const resolver = context.getClass().name
    const handler = context.getHandler().name

    const getOperation = () => print(context.getArgs()[3].operation)
    const getResponse = (value: any) => JSON.stringify(value, null, 2)

    const printLog = (duration: string) => this.logger.log(`${resolver}.${handler}() ${duration}`)
    const printDebug = (duration: string, val: any) => {
      let entry = ''

      entry += `${resolver}.${handler}() ${duration}\n\n`
      entry += getOperation() + '\n\n'
      entry += getResponse(val) + '\n'

      this.logger.debug(entry)
    }

    return next.handle().pipe(
      tap(val => {
        const duration = `+${Date.now() - now}ms`

        printLog(duration)
        printDebug(duration, val)
      }),
    )
  }
}

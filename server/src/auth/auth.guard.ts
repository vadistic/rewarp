import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'

// not obvious to get working
// https://github.com/nestjs/graphql/issues/48

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    return super.canActivate(new ExecutionContextHost([req]))
  }
}

@Injectable()
export class GraphqlAuthGuard2 extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    return super.canActivate(new ExecutionContextHost([req]))
  }
}

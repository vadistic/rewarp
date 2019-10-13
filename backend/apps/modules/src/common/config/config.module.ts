import { GraphQLModule, ModuleContext, OnInit } from '@graphql-modules/core'
import { Injectable, ProviderScope } from '@graphql-modules/di'
import { Session } from '../../app.interfaces'

@Injectable({ scope: ProviderScope.Application })
export class Config implements OnInit {
  onInit(module: typeof ConfigModule) {
    console.log('INIT', module.name)
  }
}

export interface ConfigContext {
  config: Config
}

export const ConfigModule = new GraphQLModule<Config, Session, ConfigContext>({
  name: 'ConfigModule',
  providers: ({ config }) => [{ provide: Config, useValue: config || Config }],
  context: (session, ctx: ModuleContext) => ({ config: ctx.injector.get(Config) }),
})

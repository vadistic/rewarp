import { Module, DynamicModule } from '@nestjs/common'
import { DeepPartial } from 'typeorm'
import { ConfigService } from './config.service'

@Module({
  providers: [ConfigService],
})
export class ConfigModule {
  static forRoot(config: DeepPartial<ConfigService>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useValue: { ...ConfigService, ...config },
        },
      ],
    }
  }
}

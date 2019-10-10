import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CONFIG } from './config/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: CONFIG.LOG_LEVEL_NEST,
  })
  await app.listen(CONFIG.APP_PORT)
}
bootstrap()

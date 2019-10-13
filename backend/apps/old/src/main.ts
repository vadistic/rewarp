/* eslint-disable */
import 'reflect-metadata'
/* eslint-enable */

import dotenv from 'dotenv'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '../../../.env.development' })
}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CONFIG } from './config/config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: CONFIG.LOG_LEVEL_NEST,
  })

  await app.listen(CONFIG.APP_PORT)
}

bootstrap()
